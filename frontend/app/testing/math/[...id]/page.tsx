'use client'
import useCourseApi from '@/hooks/useCourse'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { MathJax, MathJaxContext } from 'better-react-mathjax'

// Define types for questions and options
interface Question {
  statement: string
  question: string
  options: string[]
  rightAnswer: number // 1-based index for the correct answer
  explanation: string
}

type MathRoadmapLessonType = Question[]

const Loading = dynamic(() => import('@/components/Loading'), { ssr: false })

type Props = {
  params: {
    id: string,
  },
}

export default function MathId({ params }: Props) {
  const router = useRouter()
  const { id } = params
  const lessonIndex = parseInt(id[2], 10)
  const sectionIndex = parseInt(id[1], 10)
  const roadmapId = id[0]
  const { useGenerateLessonMath } = useCourseApi()
  const { mutate, isLoading: isLoadingMath, isError: isErrorMath, data: MathRoadmapLesson } = useGenerateLessonMath()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Function to extract LaTeX formulas from a string
  const extractFormula = (text: string): string[] => {
    const regex = /\\\((.*?)\\\)/g
    const matches = text.match(regex)
    return matches ? matches.map(match => match.replace(/\\\(|\\\)/g, '')) : []
  }

  useEffect(() => {
    mutate({ lessonIndex, sectionIndex, roadmapId })
  }, [lessonIndex, sectionIndex, roadmapId, mutate])

  if (isLoadingMath) {
    return <Loading />
  }

  if (MathRoadmapLesson) {
    const currentQuestion = MathRoadmapLesson[currentQuestionIndex]
    const questionFormulas = extractFormula(currentQuestion.question)
    const optionFormulas: string[][] = currentQuestion.options.map(option => extractFormula(option))

    const isAnswerCorrect = (selectedIndex: number) => {
      // Adjust for 1-based indexing (correct answer is 1-based, selected index is 0-based)
      return selectedIndex + 1 === currentQuestion.rightAnswer
    }

    return (
      <MathJaxContext>
        <section className='flex flex-col h-screen justify-between'>
          <section className='h-[30%]'>
            <div className='text-xl font-bold'>
              {currentQuestion.statement}
            </div>
            <div className='text-gray-600'>
              {questionFormulas.length > 0 ? (
                questionFormulas.map((formula, index) => (
                  <MathJax key={index} inline={false}>{`\\(${formula}\\)`}</MathJax>
                ))
              ) : (
                <span>{currentQuestion.question}</span>
              )}
            </div>
          </section>
          <section className='h-[30%]'>
            {
              currentQuestion.options.map((variant, index) => {
                const formulas = optionFormulas[index]
                return (
                  <div
                    key={index}
                    className={`flex flex-row gap-4 items-center cursor-pointer rounded-md p-2 ${selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => setSelectedAnswer(index)}
                  >
                    <div className='text-lg font-bold'>
                      {formulas.length > 0 ? (
                        formulas.map((formula, formulaIndex) => (
                          <MathJax key={formulaIndex} inline={false}>{`\\(${formula}\\)`}</MathJax>
                        ))
                      ) : (
                        <span>{variant}</span>
                      )}
                    </div>
                  </div>
                )
              })
            }
          </section>
          <section className='h-[30%]'>
            {selectedAnswer !== null && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowExplanation(true)}
              >
                Check Answer
              </button>
            )}
            {showExplanation && (
              <div className="mt-4">
                {isAnswerCorrect(selectedAnswer!) ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Correct!</strong>
                    <span className="block sm:inline">{currentQuestion.explanation}</span>
                  </div>
                ) : (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Incorrect.</strong>
                    <span className="block sm:inline">{currentQuestion.explanation}</span>
                  </div>
                )}
                {currentQuestionIndex < MathRoadmapLesson.length - 1 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    onClick={() => {
                      setCurrentQuestionIndex(currentQuestionIndex + 1)
                      setSelectedAnswer(null)
                      setShowExplanation(false)
                    }}
                  >
                    Next Question
                  </button>
                )}
                {currentQuestionIndex === MathRoadmapLesson.length - 1 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    onClick={() => {
                      const nextLessonIndex = lessonIndex + 1
                      const nextId = `${roadmapId}/${sectionIndex}/${nextLessonIndex}`
                      router.push(`/testing/math/${nextId}`)
                    }}
                  >
                    Next Lesson
                  </button>
                )}
              </div>
            )}
          </section>
        </section>
      </MathJaxContext>
    )
  } else {
    return <Loading />
  }
}
