'use client'
import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const MathQuestions = () => {
  const questions = [
    {
      text: "The symbol \\(\\otimes\\) defines a mathematical binary operation such that \\(y \\otimes x = \\frac{y^x}{x}\\) for all positive integers.",
      question: "If \\(3 \\otimes 2 = a\\), find the value of \\(a\\)."
    },
    {
      text: "Solve the inequality:",
      question: "\\(2x - 5 < 7\\)"
    },
    {
      text: "The sum of the two values of \\(x\\) that satisfy the simultaneous equations \\(x – 3y + 1 = 0\\) and \\(3x^2 –7xy = 5\\) is",
      question: "Find the sum of the two values of \\(x\\) that satisfy the simultaneous equations."
    },
    {
      text: "The algebraic fraction \\(\\frac{a}{b}\\) is equal to \\(5 - \\frac{2x}{x - 1}\\). Which one of the following is equivalent to \\(\\left(\\frac{a}{b}\\right)^{-1}\\) in terms of \\(x\\)?",
      question: "Express \\(\\left(\\frac{a}{b}\\right)^{-1}\\) in terms of \\(x\\)."
    },
    {
      text: "Using the formula \\(z &= xy^2\\) calculate the value of \\(y\\) when \\(z &= 1.12 \\times 10^{12} \\\\ x &= 3.0 \\times 10^{-8}\\)",
      question: "Calculate the value of \\(y\\)."
    },
    {
      text: "Evaluate \\(\\left(\\frac{32 \\frac{1}{6}, 9^\\circ}{81 \\frac{3}{4}}\\right)^{-1}\\)",
      question: "Find the value of the expression."
    },
    {
      text: "Given \\(2\\pi \\sqrt{\\frac{k^2 + h^2}{gh}}\\). Rearrange the formula to make \\(k\\) the subject",
      question: "Solve the equation for \\(k\\)."
    },
    {
      text: "The sum of the roots of a quadratic equation is 7, the product of the roots is 9. What is the equation?",
      question: "Find the quadratic equation."
    },
    {
      text: "The roots of the equation \\(2x^2 – 11x + a = 0\\) differ by 2. The value of \\(a\\) is",
      question: "Find the value of \\(a\\)."
    },
    {
      text: "The longest side of a right-angled triangle is \\(6 + \\sqrt{5}\\). One of the shorter sides is \\(3 + 2\\sqrt{5}\\) units. What is the length of the third side?",
      question: "Find the length of the third side."
    },
    {
      text: "Given that \\(y\\) is a solution to the simultaneous equations {simultaneous equations latex code}. What is the value of \\(y\\) when \\(x \\ge 0\\) ?",
      question: "Solve for \\(y\\) when \\(x \\ge 0\\)."
    },
    {
      text: "Five runners competed in a race: Fred, George, Hermione, Lavender, and Ron.\nFred beat George.\nHermione beat Lavender.\nLavender beat George.\nRon beat George.\nAssuming there were no ties, how many possible finishing orders could there have been, given only this information?",
      question: "How many possible finishing orders are there?"
    }
  ];

  return (
    <MathJaxContext>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              <MathJax inline>{question.text}</MathJax>
            </p>
            <p>
              <strong>Question:</strong>
              <MathJax inline>{question.question}</MathJax>
            </p>
            <hr />
          </div>
        ))}
      </div>
    </MathJaxContext>
  );
};

export default MathQuestions;