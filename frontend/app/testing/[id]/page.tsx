'use client'
import React, { useState, useEffect } from 'react'
import useCritical from '@/hooks/useCritical'
import { criticalTestType } from '@/types/useCritical.types'
type Props = {
    params: {
        id: string
    }
}

export default function PageID({params}: Props) {
    const {criticalDataAll, isLoading, error, getAllCriticalTests} = useCritical()
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

    const handleSubmitTest = async () => {
       try {
            const response = await fetch(`http://localhost:5000/critical/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userAnswers),
            });

            if (response.ok) {
                console.log('Test submitted successfully!');
                setUserAnswers({});
            } else {
                console.error('Error submitting test:', response.status);
            }
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

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
            <button onClick={handleSubmitTest}>Submit Test</button>
        </div>
    );
}
