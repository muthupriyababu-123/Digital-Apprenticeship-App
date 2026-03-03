import React, { useState, useEffect } from 'react';

const TaskSubmit = ({ userXP = 0 }) => {
  const [xp, setXP] = useState(userXP);

  // Load XP from localStorage when component mounts
  useEffect(() => {
    const savedXP = localStorage.getItem('userXP');
    if (savedXP) setXP(Number(savedXP));
  }, []);

  const handleXPIncrease = (earned = 10) => {
    const newXP = xp + earned;
    setXP(newXP);
    localStorage.setItem('userXP', newXP);
  };

  const progressPercent = Math.min((xp / 100) * 100, 100); // Max 100 XP

  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#ddd"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#7c3aed"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 36}
            strokeDashoffset={2 * Math.PI * 36 * (1 - progressPercent / 100)}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-purple-700 font-bold">
          {xp} XP
        </div>
      </div>

      <button
        onClick={() => handleXPIncrease(10)}
        className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition"
      >
        +10 XP
      </button>
    </div>
  );
};

export default TaskSubmit;