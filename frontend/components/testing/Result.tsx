'use client'
import React, { useState, useEffect } from 'react';
import { criticalTestType } from '@/types/useCritical.types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useCritical from '@/hooks/useCritical';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  criticalData: criticalTestType | undefined;
  userAnswers: { [questionId: string]: string };
};

const ResultsComponent: React.FC<Props> = ({ criticalData, userAnswers }) => {
  const [results, setResults] = useState<
    { questionId: string; isCorrect: boolean }[]
  >([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    if (criticalData && userAnswers) {
      const calculatedResults = criticalData.test.map((question, index) => ({
        questionId: question.id,
        isCorrect: userAnswers[Number(question.id)] === question.options[Number(question.answer)-1],
      }));
      setResults(calculatedResults);
      setCorrectAnswersCount(
        calculatedResults.filter((result) => result.isCorrect).length
      );
    }
  }, [criticalData, userAnswers]);

  const data = {
    labels: results.map((result) => `Question ${result.questionId}`),
    datasets: [
      {
        label: 'Correctness',
        data: results.map((result) => (result.isCorrect ? 1 : 0)),
        backgroundColor: results.map((result) =>
          result.isCorrect ? 'green' : 'red'
        ),
      },
    ],
  };

  return (
    <div>
      <h2>Test Results</h2>
      <p>
        You answered <strong>{correctAnswersCount}</strong> out of{' '}
        <strong>{criticalData?.test.length}</strong> questions correctly.
      </p>
      <Bar data={data} />
    </div>
  );
};

export default ResultsComponent;
