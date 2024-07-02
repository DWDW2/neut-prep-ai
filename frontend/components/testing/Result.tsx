// // components/Result.js
// import React from 'react';
// import { Bar } from 'react-chartjs-2';

// const Result = ({ correctAnswers, totalQuestions }) => {
//   const data = {
//     labels: ['Correct', 'Incorrect'],
//     datasets: [
//       {
//         label: 'Results',
//         data: [correctAnswers, totalQuestions - correctAnswers],
//         backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Your Result</h2>
//       <p>
//         You got {correctAnswers} out of {totalQuestions} correct!
//       </p>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default Result;
