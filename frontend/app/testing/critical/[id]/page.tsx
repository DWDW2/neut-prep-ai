'use client'
import React, { useState, useEffect } from 'react';
import useCritical from '@/hooks/useCritical';
import { criticalTestType, useCriticalUpdateResponseType } from '@/types/useCritical.types';
import Loading from '@/components/Loading';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';

type Props = {
    params: {
        id: string
    }
};

interface Result {
    id: string;
    isCorrect: boolean; 
}

export default function PageID({ params }: Props) {
    const { criticalDataAll, getAllCriticalTests, isLoading, error, handleSubmitTest, finished } = useCritical();
    const [criticalData, setCriticalData] = useState<criticalTestType | undefined>(undefined);
    const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({});
    const [results, setResults] = useState<useCriticalUpdateResponseType>({ results: [{ isCorrect: false, questionId: '' }] });
    const [timer, setTimer] = useState<number>(60 * 60); 
    const router = useRouter();

    useEffect(() => {
        getAllCriticalTests();
    }, []);

    useEffect(() => {
        if (criticalDataAll) {
            setCriticalData(criticalDataAll.find(item => item._id === params.id));
        }
    }, [criticalDataAll, params.id]);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearTimeout(countdown);
        } else {
            handleSubmitTestFront();
        }
    }, [timer]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setUserAnswers({ ...userAnswers, [questionId]: answer });
    };

    const handleSubmitTestFront = async () => {
        try {
            const response: useCriticalUpdateResponseType = await handleSubmitTest(params.id, userAnswers);
            setResults(response);
        } catch (err) {
            console.log(err);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <div>Error</div>;
    }

    if (finished) {
        return (
            <div>
                <h1 className='text-2xl font-bold m-5'>Critical Thinking Test Results</h1>
                <div className='p-6 px-32'>
                    {criticalData?.test.map((question, index) => (
                        <div key={index} className='my-3'>
                            <p className='text-xl'><strong>Question {index + 1}:</strong><br />{question.statement}</p>
                            <p className='text-xl mt-4 mb-4'> {question.question}</p>
                            <ul>
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex} className='text-xl'>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            disabled
                                            checked={userAnswers[question.id] === option}
                                            className={`peer relative appearance-none 
                                                        w-5 h-5 border 
                                                        rounded-full border-slate-800
                                                        cursor-pointer  
                                                        checked:bg-slate-600 mr-3 ${results.results[index].isCorrect ? 'bg-green-500' : 'bg-red-500'}`} 
                                        />
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            <div 
                                className="max-w-full overflow-x-auto border border-gray-300 rounded-lg p-4 bg-gray-100 my-5" 
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<table style="border-collapse: separate; border-spacing: 10px 0;">${question.table?.replace(/\n/g, '<br />') || ''}</table>`) }} 
                            />
                            <p className={`text-xl mt-2 ${results.results[index].isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                {results.results[index].isCorrect ? 'Correct' : 'Incorrect'}
                            </p>
                            {results.results[index].isCorrect ? (
                                <p className='text-xl mt-2 text-green-500'>
                                    Explanation: {question.explanation}
                                </p>
                            ) : (
                                <p className='text-xl mt-2 text-red-500'>
                                    Explanation: {question.explanation}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <div className='fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center'>
                    <button
                        onClick={() => router.push(`/testing/critical`)}
                        className='bg-blue-500 text-white px-4 py-2 rounded'
                    >
                        Back to Tests
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className='text-2xl font-bold m-5'>Critical Thinking Test</h1>
            <div className='p-6 px-32'>
                {criticalData?.test.map((question, index) => (
                    <div key={index} className='my-3'>
                        <p className='text-xl'><strong>Question {index + 1}:</strong><br />{question.statement}</p>
                        <p className='text-xl mt-4 mb-4'> {question.question}</p>
                        <ul>
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex} className='text-xl'>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={userAnswers[question.id] === option}
                                        onChange={() => handleAnswerChange(question.id, option)}
                                        className="peer relative appearance-none 
                                                    w-5 h-5 border 
                                                    rounded-full border-slate-800
                                                    cursor-pointer  
                                                    checked:bg-slate-600 mr-3" 
                                    />
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <div 
                            className="max-w-full overflow-x-auto border border-gray-300 rounded-lg p-4 bg-gray-100 my-5" 
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<table style="border-collapse: separate; border-spacing: 10px 0;">${question.table?.replace(/\n/g, '<br />') || ''}</table>`) }} 
                        />
                    </div>
                ))}
            </div>
            <div className='fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center'>
                <div>Time remaining: {formatTime(timer)}</div>
                <button
                    onClick={handleSubmitTestFront}
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Submit Test
                </button>
            </div>
        </div>
    );
}
