import React from 'react';

type Props = {
  performanceData: {
    name: string;
    score: number;
  }[];
};


const PerformanceSummary = ({ performanceData } : Props) => {
  const improvementThreshold = 50; // You can adjust this threshold as needed

  // Filter out themes that need improvement
  const themesToImprove = performanceData.filter(
    (theme) => theme.score < improvementThreshold
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md m-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Themes to Improve</h2>
      {themesToImprove.length > 0 ? (
        <ul className="list-none p-0">
          {themesToImprove.map((theme) => (
            <li key={theme.name} className="flex justify-between border-b border-gray-300 py-2">
              <span>{theme.name}</span>
              <span className="font-bold text-red-600">{theme.score}%</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-green-600 font-semibold">Great job! No themes need improvement.</p>
      )}
    </div>
  );
};

export default PerformanceSummary;
