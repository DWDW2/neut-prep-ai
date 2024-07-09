import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';

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
    <div className="dashboard-container">
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
      <div className="info-container">
        <h2>Points Received in Last Test: {points}</h2>
        <h3>Best Skills:</h3>
        <ul>
          {bestSkills.map(skill => (
            <li key={skill.name}>{skill.name} - {skill.points} points</li>
          ))}
        </ul>
        <button className="continue-button" onClick={continueCourse}>
          Continue Course
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
