// components/Question.js
import React from 'react';
import { useCriticalResponseType } from '@/types/useCritical.types';

interface QuestionProps extends useCriticalResponseType {
  handleAnswer: (str: string) => void;
}


const Question = ({ question, statement,  options,  handleAnswer }: QuestionProps) => {
  return (
    <div>
      <h3>{question}</h3>
      <h2>{statement}</h2>
      {options.map((option, idx) => (
        <button key={idx} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
