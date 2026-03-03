import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: "Hi there! 👋 I'm your digital assistant. Ask me anything about SkillBridge or your progress!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // FIX: Changed 'localhost' to '127.0.0.1' to match your Python terminal
      const response = await fetch("http://127.0.0.1:5001/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'ai', text: data.reply }]);
      
    } catch (error) {
      console.error("Chatbot Error details:", error);
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        text: "I'm having trouble reaching my brain. Please check if the Python terminal shows any errors and that you've enabled CORS!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-3xl shadow-2xl border border-gray-200 flex flex-col mb-6 overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom-right">
          
          <div className="bg-blue-600 p-5 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-bold text-sm leading-none">SkillBridge Assistant</p>
                <span className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online</p>
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-2 rounded-full transition-colors outline-none">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-5 bg-gray-50 overflow-y-auto space-y-4">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-2xl text-xs shadow-sm max-w-[85%] border ${
                  msg.role === 'ai' 
                    ? 'bg-blue-600 text-white rounded-tl-none border-blue-700' 
                    : 'bg-white text-gray-700 ml-auto rounded-tr-none border-gray-200'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-blue-100 text-blue-800 p-3 rounded-2xl rounded-tl-none text-[10px] font-bold animate-pulse w-fit">
                AI is thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              placeholder="Ask me anything..." 
              className="flex-1 text-xs border border-gray-200 p-3 rounded-xl px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 shadow-lg active:scale-90 transition-all flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className={`bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90 border-4 border-white ring-4 ring-blue-500/10 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </button>
    </div>
  );
};

export default Chatbot;