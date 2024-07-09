import React from 'react';

const DSATScoreCard = () => {
  return (
    <div className="bg-purple-100 p-6 rounded-3x w-[400px]">
      <div className="bg-white rounded-2xl p-4 mb-4 relative">
        <div className="absolute top-3 right-3 bg-green-300 text-xs px-2 py-1 rounded-full">
          Valid
        </div>
        <h2 className="text-gray-500 mb-2">NUET Exam</h2>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#c7f9cc"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="70"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">198</span>
              <span className="text-xs text-gray-500">Predicted Score</span>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm text-center">
          View Details
        </div>
      </div>
      
      <div className="bg-green-300 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">83%</span>
            <p className="text-sm">Strongest Section:</p>
            <p className="text-sm">Quadratic equations</p>
          </div>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <span>Complete 20 Practice Questions</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Fix mistakes in 2 areas</span>
          </div>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DSATScoreCard;