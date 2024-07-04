'use client'
import React, { useState, useEffect } from 'react';
import useMath from '@/hooks/useMath';
import { mathTestType, useMathUpdateResponseType } from '@/types/useMath.types';
import Loading from '@/components/Loading';
import MathRenderer from '@/components/MathRender';
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
    const { mathDataAll, getAllMathTests, isLoading, error, handleSubmitTest, finished } = useMath();
    const [mathData, setMathData] = useState<mathTestType | undefined>(undefined);
    const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({});
    const [results, setResults] = useState<useMathUpdateResponseType>({ results: [{ isCorrect: false, questionId: '' }] });
    const [timer, setTimer] = useState<number>(60 * 60); 
    const router = useRouter();

    useEffect(() => {
        getAllMathTests();
    }, []);

    useEffect(() => {
        if (mathDataAll) {
            setMathData(mathDataAll.find(item => item._id === params.id));
        }
    }, [mathDataAll, params.id]);

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
            const response: useMathUpdateResponseType = await handleSubmitTest(params.id, userAnswers);
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
                <h1 className='text-2xl font-bold m-5'>Nuet Math Test Results</h1>
                <div className='p-6 px-32'>
                    {mathData?.test.map((question, index) => (
                        <div key={index} className='my-3'>
                            <p className='text-xl'><strong>Question {index + 1}:</strong><br />
                                <MathRenderer expression={question.question?.replace(/\\/g, '')} /></p>
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
                                        <MathRenderer expression={option?.replace(/\\/g, '')} />
                                    </li>
                                ))}
                            </ul>
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
                        onClick={() => router.push(`/testing/math`)}
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
            <h1 className='text-2xl font-bold m-5'>Nuet Math Test</h1>
            <div className='p-6 px-32'>
                {mathData?.test.map((question, index) => (
                    <div key={index} className='my-3'>
                        <p className='text-xl mt-4 mb-4'><strong>Question {index + 1}:</strong><br />
                            <MathRenderer expression={question.question?.replace(/\\/g, '')} /></p>
                        <ul>
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex} className='text-xl'>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={userAnswers[question.id] === option}
                                        onChange={() => handleAnswerChange(question.id, option)}
                                        className='peer relative appearance-none 
                                                    w-5 h-5 border 
                                                    rounded-full border-slate-800
                                                    cursor-pointer  
                                                    checked:bg-slate-600 mr-3'
                                    />
                                    <MathRenderer expression={option?.replace(/\\/g, '')} />
                                </li>
                            ))}
                        </ul>
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
