'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useCourseApi from '@/hooks/useCourse'
import useStore from '@/hooks/useStore'
import 'katex/dist/katex.min.css'

const Latex = dynamic(() => import('react-latex-next'), { ssr: false })
const Loading = dynamic(() => import('@/components/Loading'), { ssr: false })

interface Question {
  statement: string
  question: string
  variants: string[]
  rightAnswer: number | string
  explanation: string
}

type MathRoadmapLessonType = Question[]

type mathHardcoded = {
  lessons: MathRoadmapLessonType
}
type Props = {
  params: { id: string[] }
}

export default function MathId({ params }: Props) {
  const router = useRouter()
  const { id } = params
  const lessonIndex = parseInt(id[2], 10)
  const sectionIndex = parseInt(id[1], 10)
  const roadmapId = id[0]
  const roadmapType = 'math'
  const xp = parseInt(id[3], 10)
  const questionType = id[4]
  const lessonContent = id[5]
  const {
    useGenerateLesson,
    useHandleIncorrectThemes,
    useUpdateXpByLesson,
    useHandleBestThemes,
    useGetUser,
    useSetFinished,
    useSetXpGained,
    useGetLesson,
    useSetUserAnswers
  } = useCourseApi()

  const { data: session } = useSession()
  const { mutate: generateLesson, isLoading: isLoadingMath, isError: isErrorMath, data: generatedLesson, error: fetchError } = useGenerateLesson()
  const { mutate: handleIncorrectTheme } = useHandleIncorrectThemes()
  const { mutate: updateXpByLesson } = useUpdateXpByLesson()
  const { mutate: handleBestTheme } = useHandleBestThemes()
  const { refetch: refetchUser } = useGetUser()
  const { mutate: setXpGained } = useSetXpGained()
  const { mutate: setAnswers } = useSetUserAnswers()
  const { mutate: setFinished } = useSetFinished()
  const { mutate: getLesson, isLoading: isLoadingLesson, isError: isErrorLesson, data: lessonData } = useGetLesson()

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(1)
  const [lesson, setLesson] = useState<MathRoadmapLessonType>([])
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showNextButton, setShowNextButton] = useState(false)
  const [incorrectIndexes, setIncorrectIndexes] = useState<number[]>([])
  const { setLessonCompleted } = useStore()
  
  console.log(userAnswers)
  console.log(lesson)
  
  useEffect(() => {
    const fetchLesson = async () => {
      if (session) {
        if (lessonContent) {
          await getLesson({ lessonIndex, sectionIndex, roadmapId })
        } else {
          await generateLesson({ lessonIndex, sectionIndex, roadmapType })
        }
      } else {
        try {
          const lesson = await fetch('/lessonMathHard.json')
            .then(res => res.json())
            .then((data: mathHardcoded) => data)
          setLesson(lesson.lessons as MathRoadmapLessonType)
          setLessonCompleted(true)
          console.log(lesson.lessons)
        } catch (error) {
          console.error('Error fetching hardcoded data:', error)
        }
      }
    }

    fetchLesson()
  }, [lessonContent, getLesson, generateLesson, lessonIndex, sectionIndex, roadmapId, roadmapType, session])

  useEffect(() => {
    if (lessonContent && lessonData) {
      setLesson(lessonData.lessons as MathRoadmapLessonType)
      setIncorrectIndexes(lessonData.incorrectIndexes)
    } else if (generatedLesson) {
      setLesson(generatedLesson as MathRoadmapLessonType)
    }
  }, [lessonContent, lessonData, generatedLesson])


  useEffect(() => {
    if (lesson.length > 0) {
      const answersCopy = [...userAnswers]
      answersCopy[currentQuestionIndex] = selectedAnswer ?? -1
      setUserAnswers(answersCopy)
    }
  }, [currentQuestionIndex, selectedAnswer, lesson.length])

  if (isLoadingMath || (!session && !lesson.length)) {
    return <Loading />
  }

  if (fetchError || (lessonContent && isErrorLesson)) {
    router.push('/testing/app/math')
    return null
  }

  if (!lesson.length) {
    return <Loading />
  }

  const currentQuestion = lesson[currentQuestionIndex]

  const handleCheckAnswer = () => {
    setShowExplanation(true)
    const rightAnswerNumber = typeof currentQuestion.rightAnswer === 'string'
      ? parseInt(currentQuestion.rightAnswer, 10)
      : currentQuestion.rightAnswer

    if (selectedAnswer === rightAnswerNumber) {
      setCorrectAnswers(correctAnswers + 1)
    }
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleNextLesson = async () => {
    if (calculatePerformance() === 100) {
      await setFinished({ roadmapId, lessonIndex, sectionIndex })
    }
    router.push('/testing/app/math')
  }

  const calculatePerformance = () => {
    console.log((correctAnswers / lesson.length) * 100)
    return (correctAnswers / lesson.length) * 100
  }

  const sendXPAndQuestionType = async () => {
    const performance = calculatePerformance()
    const xpEarned = (performance / 100) * xp
    try {
      if (performance <= 60) {
        handleIncorrectTheme({ incorrectThemes: [questionType] })
      } else {
        handleBestTheme({ bestThemes: [questionType] })
      }
      updateXpByLesson({ points: xpEarned })
      setXpGained({ xpGained: xpEarned, lessonIndex:lessonIndex, sectionIndex:sectionIndex, roadmapId:roadmapId })
      setAnswers({ answers: userAnswers, incorrectIndexes:incorrectIndexes!, roadmapId:roadmapId, lessonIndex:lessonIndex, sectionIndex:sectionIndex })
      console.log('XP and questionType sent successfully!')
    } catch (error) {
      console.error('Error sending XP and questionType:', error)
    }
  }

  const renderMath = (content: string) => {
    return <Latex>{content}</Latex>
  }

  return (
    <section className='flex flex-col h-screen justify-between p-10 max-[800px]:p-4'>
      <section className='px-5'>
        <div className='text-2xl font-bold pb-4'>
          {renderMath(currentQuestion.statement)}
        </div>
        <div className='text-black text-xl pb-4'>
          {currentQuestion.question.split('\n').map((line, index) => (
            <div key={index}>
              {renderMath(line)}
            </div>
          ))}
        </div>
      </section>
      <section className='flex flex-col gap-1 px-5'>
        {currentQuestion.variants.map((variant, index) => (
          <div
            key={index}
            className={`flex flex-row gap-4 items-center cursor-pointer border-2 border-b-4 active:border-b-2 border-slate-300 rounded-lg p-2 ${
              selectedAnswer === index ? 'bg-sky-100 border-sky-300 text-black' : 'bg-slate-100'
            }`}
            onClick={() => setSelectedAnswer(index)}
          >
            <div className='text-lg font-bold'>
              {renderMath(variant)}
            </div>
          </div>
        ))}
      </section>
      <section className='py-5'>
        {showExplanation && (
          <div className='bg-sky-50 border-t-4 border-sky-400 rounded p-4 text-black'>
            <div className='font-bold text-lg'>Explanation:</div>
            {renderMath(currentQuestion.explanation)}
          </div>
        )}
        <div className='flex justify-end gap-4 pt-4'>
          {currentQuestionIndex < lesson.length - 1 ? (
            <>
              <button
                className={`px-6 py-3 rounded-lg bg-sky-400 text-white text-lg font-bold max-[800px]:w-full max-[800px]:mx-3  ${showExplanation ? 'hidden' : ''}`}
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
              >
                Check Answer
              </button>
              <button
                className={`px-6 py-3 rounded-lg bg-sky-400 text-white text-lg font-bold max-[800px]:w-full max-[800px]:mx-3 ${showExplanation ? '' : 'hidden'}`}
                onClick={handleNextQuestion}
                disabled={!showExplanation}
              >
                Next Question
              </button>
            </>
          ) : (
            <button
              className='px-6 py-3 rounded-lg bg-sky-400 text-white text-lg font-bold max-[800px]:w-full max-[800px]:mx-3'
              onClick={() => {
                sendXPAndQuestionType()
                handleNextLesson()
              }}
            >
              Finish Lesson
            </button>
          )}
        </div>
      </section>
    </section>
  )
}
