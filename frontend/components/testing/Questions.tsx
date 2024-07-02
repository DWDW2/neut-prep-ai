// components/QuestionList.js
import React from 'react';
import Question from './Question';
import { useCriticalResponseType } from '@/types/useCritical.types';

type Questions = useCriticalResponseType[]
interface QuestionProps {
  questions: Questions;
  handleAnswer: (answer: string) => void;
}

const QuestionList = ({ questions, handleAnswer }: QuestionProps) => {
  return (
    <div>
      {questions.map((question, index) => (
        <Question key={index} question={question.question} answer={question.answer} id={question.id} options={question.options} handleAnswer={handleAnswer} statement={question.statement} explanation={''} />
      ))}
    </div>
  );
};

export default QuestionList;
