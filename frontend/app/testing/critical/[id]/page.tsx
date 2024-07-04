'use client'
import React, { useState, useEffect } from 'react'
import useCritical from '@/hooks/useCritical'
import { criticalTestType } from '@/types/useCritical.types'
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
    const {criticalDataAll, isLoading, error, getAllCriticalTests, finished, setFinished, handleSubmitTest} = useCritical()
    const [criticalData, setCriticalData] = useState<criticalTestType | undefined>(undefined);
    const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({}); 
    const [results, setResults] = useState<Result[]>([]); 

    console.log(userAnswers)
    useEffect(() => {
        getAllCriticalTests()
    }, [])

    useEffect(() => {
        if (criticalDataAll) {
            setCriticalData(criticalDataAll.find(item => item._id === params.id));
        }
    }, [criticalDataAll, params.id]);

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
        const response: Result[] = await handleSubmitTest(params.id ,userAnswers)
        setResults(response)
      }catch(err){
        console.log(err)
      }
    };
    if(finished){
        return (
            <div>
                {results[0].isCorrect}
            </div>
        )
    }
    return (
        <div>
            {criticalData?.test.map((question, index) => (
                <div key={index}>
                    <p><strong>Statement:</strong><br/>{question.statement}</p>
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
