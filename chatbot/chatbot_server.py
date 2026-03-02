from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from sentence_transformers import SentenceTransformer, CrossEncoder
import faiss
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

# Allows React to talk to Python
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- CONFIG ---
# Using the API Key provided
GEMINI_API_KEY = "AIzaSyDJ427P6hgez2TutupHBCnsu2Ky2VBv0Ss"

# Robust Path Handling for Windows
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, 'qadataset.csv')

# --- INITIALIZATION ---
print("Loading dataset and AI models... please wait.")

if not os.path.exists(CSV_PATH):
    print(f"ERROR: qadataset.csv not found at {CSV_PATH}")
    exit()

dt = pd.read_csv(CSV_PATH)
document = [f"Q: {q}\nA: {a}" for q, a in zip(dt['Question'], dt['Answer'])]

client = genai.Client(api_key=GEMINI_API_KEY)
embed_model = SentenceTransformer('all-MiniLM-L6-v2')
rerank_model = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

embeddings = embed_model.encode(document)
faiss.normalize_L2(embeddings)
index = faiss.IndexFlatIP(embeddings.shape[1])
index.add(embeddings.astype('float32'))

chat_history = []

def best_doc_find(prompt):
    query_embedding = embed_model.encode([prompt])
    faiss.normalize_L2(query_embedding)
    _, indices = index.search(np.array(query_embedding).astype('float32'), k=5)
    candidates = [document[i] for i in indices[0]]
    pairs = [[prompt, doc] for doc in candidates]
    scores = rerank_model.predict(pairs)
    return candidates[np.argmax(scores)]

# --- API ROUTE ---
@app.route('/api/chatbot', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    global chat_history
    try:
        data = request.json
        prompt = data.get('message')
        
        print(f"\n[RECEIVED]: {prompt}")

        if not prompt:
            return jsonify({"reply": "I didn't receive a message."}), 400

        # Find the best match from your CSV
        context = best_doc_find(prompt)
        memory_context = "\n".join(chat_history[-4:])
        
        full_prompt = f"""
        History: {memory_context}
        Context: {context}
        User Question: {prompt}
        Answer the question briefly and formally using the context. 
        If not in context, say you are not sure.
        """
        
        # --- SAFE MODEL LOGIC ---
        response = None
        models_to_try = ['gemini-1.5-flash-8b', 'gemini-1.5-flash', 'gemini-2.0-flash']
        
        last_error = ""
        for model_id in models_to_try:
            try:
                print(f"-> Attempting {model_id}...")
                response = client.models.generate_content(model=model_id, contents=full_prompt)
                if response:
                    print(f"-> SUCCESS with {model_id}")
                    break 
            except Exception as e:
                last_error = str(e)
                continue
        
        # --- FALLBACK LOGIC ---
        # If all AI models failed (usually due to 429 Quota Exceeded)
        if not response:
            print("-> AI Models busy. Switching to Local Fallback (Demo Mode)...")
            # We extract the 'A: ' part directly from the CSV context found by FAISS
            if "A: " in context:
                fallback_reply = context.split("A: ")[1]
            else:
                fallback_reply = "I'm experiencing high traffic right now. Please try again in a minute."
            
            # Return the raw answer from the CSV directly
            return jsonify({"reply": f"{fallback_reply}"})

        # If AI worked, use the AI response
        ai_text = response.text
        chat_history.append(f"User: {prompt}")
        chat_history.append(f"AI: {ai_text}")

        print(f"[REPLYING]: {ai_text[:50]}...")
        return jsonify({"reply": ai_text})
        
    except Exception as e:
        print(f"Critical Error: {e}")
        return jsonify({"reply": "System Error. Check Python Terminal."}), 500

if __name__ == '__main__':
    print("\n---------------------------------------")
    print("SkillBridge AI Server is now RUNNING!")
    print("Local Fallback (Demo Mode) is ENABLED")
    print("---------------------------------------")
    app.run(host='127.0.0.1', port=5001, debug=True)