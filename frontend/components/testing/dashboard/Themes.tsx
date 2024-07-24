import React from 'react';

type Props = {
  themesToImprove: string[];
};


const PerformanceSummary = ({ themesToImprove } : Props) => {
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Themes to Improve</h2>
      <ul className="list-none p-0">
        {themesToImprove.map((theme, index) => (
          <li key={index} className="border-b border-gray-300 py-2">
            <span>{theme}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceSummary;
