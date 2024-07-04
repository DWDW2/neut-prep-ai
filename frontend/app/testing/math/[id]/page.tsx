'use client'
import React, { useState, useEffect } from 'react'
import useMath from '@/hooks/useMath'
import { mathTestType } from '@/types/useMath.types'
type Props = {
    params: {
        id: string
    }
}

interface Result {
    id: string;
    isCorrect: boolean; 
}

export default function PageID({params}: Props) {
    const { mathDataAll, mathUrl, getAllMathTests, isLoading, error, handleSubmitTest, finished} = useMath()
    const [mathData, setMathData] = useState<mathTestType | undefined>(undefined);
    const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({}); 
    const [results, setResults] = useState<Result[]>([]); 

    console.log(userAnswers)

    useEffect(() => {
        getAllMathTests()
    }, [])

    useEffect(() => {
        if (mathDataAll) {
            setMathData(mathDataAll.find(item => item._id === params.id));
        }
    }, [mathDataAll, params.id]);

    if(isLoading) {
        return <div>
            Loading
        </div>
    }
    if(error) {
        return <div>
            Error
        </div>
    }

    const handleAnswerChange = (questionId: string, answer: string) => {
        setUserAnswers({ ...userAnswers, [questionId]: answer });
    };

    const handleSubmitTestFront = async () => {
      try{
        const response = await handleSubmitTest(params.id ,userAnswers)
        setResults(response)
        console.log(response)
      }catch(err){
        console.log(err)
      }
    };
    if(finished){
        return (
            <div>
              finished {results[0].id}
            </div>
        )
    }
    return (
        <div>
            {mathData?.test.map((question, index) => (
                <div key={index}>
                    <p><strong>Question {index + 1}:</strong> {question.question}</p>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li key={optionIndex}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    checked={userAnswers[question.id] === option}
                                    onChange={() => handleAnswerChange(question.id, option)}
                                />
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button onClick={handleSubmitTestFront}>Submit Test</button>
        </div>
    );
}
