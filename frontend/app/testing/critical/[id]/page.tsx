'use client'
import React, { useState, useEffect } from 'react'
import useCritical from '@/hooks/useCritical'
import { criticalTestType } from '@/types/useCritical.types'
import ResultsComponent from '@/components/testing/Result'
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
    const [selectedCategory, setSelectedCategory] = useState('criticalThinking'); 
    console.log(userAnswers)
    useEffect(() => {
        getAllCriticalTests()
    }, [])

    useEffect(() => {
        if (criticalDataAll) {
            setCriticalData(criticalDataAll.find(item => item._id === params.id));
        }
    }, [criticalDataAll, params.id, selectedCategory]);

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
        const data = response.data
      }catch(err){
        console.log(err)
      }
    };
    if(finished){
        return (
            <ResultsComponent criticalData={criticalData} userAnswers={userAnswers} />
        )
    }
    return (
        <div>
            <div>
                <label htmlFor="category">Select Category:</label>
                <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="criticalThinking">Critical Thinking</option>
                    <option value="math">Math</option>
                </select>
            </div>

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
