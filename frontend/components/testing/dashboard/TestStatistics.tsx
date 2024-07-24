import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

type Props = {
  points: number,
  skills: Array<{ name: string, points: number }>,
  bestSkills: Array<{ name: string, points: number }>,
  continueCourse: () => void,
}

const Dashboard = ({ points, skills, bestSkills, continueCourse } : Props) => {
  const data = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Points',
        data: skills.map(skill => skill.points),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg">
      <div className="w-full h-2/3">
        <Doughnut data={data} options={options} />
      </div>
      <div className="w-full h-1/3 mt-4 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Points Received in Last Test: {points}</h2>
        <h3 className="text-lg font-semibold mb-1">Best Themes:</h3>
        <ul className="list-disc list-inside mb-4">
          {bestSkills.map(skill => (
            <li key={skill.name} className="text-base">{skill.name} - {skill.points} points</li>
          ))}
        </ul>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={continueCourse}
        >
          Continue Course
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
