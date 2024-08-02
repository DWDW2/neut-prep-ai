'use client'
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedWrapper from "@/components/testing/Feed-sidebar";
import StickySideBar from "@/components/testing/Sticky-sidebar";
import UserSideBar from "@/components/testing/XPgained";
import UserProgress from "@/components/testing/UserProgress";
import UnitButton from "@/components/testing/LessonButton";
import UnitSection from "@/components/testing/UnitSection";
import { useRoadmapQuery } from "@/hooks/useRoadmap";
import useCourseApi from "@/hooks/useCourse";
import CongratulationsModal from "@/components/testing/CongratulationsModal";
import { Roadmap } from "@/types/useRoadmap.types";
import { useSession } from "next-auth/react";
import AuthForm from "@/components/testing/AuthForm";
import useStore from "@/hooks/useStore";
import LessonCompleteModal from "@/components/testing/AuthFormaModal";

const Loading = dynamic(() => import('@/components/Loading'), { ssr: false });

type Props = {};

interface handleLesson {
  sectionIndex: number,
  lessonIndex: number,
  roadmapId: string;
  xp: number;
  questionType: string;
  locked: boolean;
  lessonContent: string;
}

export default function MathDetailed({ }: Props) {
  const router = useRouter();
  const { useGetRoadmap } = useRoadmapQuery();
  const { useGetUser, useUpdateStreak, useUpdateXp } = useCourseApi();
  const { data: session } = useSession();
  const [isLessonActive, setLessonActive] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [roadmapContent, setRoadmapContent] = useState<Roadmap | null>(null);

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useGetUser();
  const { data: updatedXp } = useUpdateXp();
  const { mutate: mutateStreak } = useUpdateStreak();
  const { data: RoadMapMath, isLoading: isLoadingMath, isError: isErrorMath, refetch: refetchRoadmap } = useGetRoadmap();
  const {isLessonCompleted, setLessonCompleted} = useStore()
  const {setIsModalShowed, isModalShowed} = useStore()

  const handleLessonClick = ({ lessonIndex, sectionIndex, roadmapId, xp, questionType, locked, lessonContent }: handleLesson) => {
    if (!locked) {
      router.push(`/testing/app/math/${roadmapId}/${sectionIndex}/${lessonIndex}/${xp}/${questionType}/${lessonContent ? lessonContent : ''}`);
    } else {
      toast.info('Complete previous lessons to unlock this one');
    }
  };

  const handleFetchError = (error: any) => {
    console.log('mounted handleFetcherror')
    if (error.response?.status === 401) {
      router.push('/login');
    } else {
      toast.error('An error occurred while fetching data.');
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (session && !isLoadingUser) {
        try {
          if (!user) {
            router.push('/login');
          } else {
            if (user.roadmapMathId !== null) {
              refetchRoadmap();
            }

            if (isLoadingMath) return;
            if (isErrorMath) {
              toast.error('An error occurred while loading the lesson. Please try again.');
            } else {
              setRoadmapContent(RoadMapMath?.mathRoadmap || null);
            }
          }
        } catch (error) {
          handleFetchError(error);
        }
      } else {
        const mathHard = await fetch('/mathHard.json').then(res => res.json()).then((data: Roadmap) => { return data })
        setRoadmapContent(mathHard);
      }
    };

    fetchData();
    const intervalId = setInterval(() => fetchData(), 10000);
    return () => clearInterval(intervalId);
  }, [session, user, RoadMapMath, isLoadingMath, isErrorMath, refetchRoadmap]);

  useEffect(() => {
    if (session && user) {
      mutateStreak();
    }
  }, [session, user, mutateStreak]);

  useEffect(() => {
    if (session && user?.todaysXp! >= 20) { 
      if(!isModalShowed){
        setShowModal(true);
        setIsModalShowed(true)
      }
    }
  }, [session, user]);

  const closeModal = () => {
    setShowModal(false);
  };

  const roadmapDisplay = useMemo(() => {
    if (!roadmapContent) return null;
    return roadmapContent.roadmap.map((section, index) => (
      <div key={index}>
        <UnitSection Unit={section.unit} UnitName={section.section} />
        {section.lessons.map((lesson, lessonIndex) => (
          <UnitButton
            locked={lesson.locked}
            isCurrent={lesson.isCurrent}
            maxValue={lesson.xp}
            finished={lesson.finished}
            xp={lesson.xpGained}
            key={lessonIndex}
            index={lessonIndex}
            totalCount={section.lessons.length}
            onClick={() => handleLessonClick({ roadmapId: RoadMapMath?.mathRoadmap._id || '', sectionIndex: index, lessonIndex, xp: lesson.xp, questionType: section.questionType, locked: lesson.locked, lessonContent: lesson.lessonContent })}
          />
        ))}
      </div>
    ));
  }, [roadmapContent]);

  if (!roadmapContent && !isLoadingMath) return <Loading />;

  return (
    <div className="flex lg:flex-row-reverse px-6">
      <StickySideBar>
        <section className="flex flex-col gap-y-4 p-4">
          {session ? (
            <>
              <UserSideBar title="Daily quest" dailyGoal={20} xp={user?.todaysXp || 0} />
              <UserProgress dailyGoal={20} xp={user?.todaysXp || 0} />
            </>
          ) : (
            <AuthForm />
          )}
        </section>
      </StickySideBar>
      <FeedWrapper>
        <section className="pt-6 gap-y-4 flex flex-col">
          {roadmapDisplay}
        </section>
      </FeedWrapper>
      <ToastContainer />
      <CongratulationsModal show={showModal} onClose={closeModal} xp={user?.todaysXp || 0} /> 
      <LessonCompleteModal isModalOpen={isLessonCompleted} closeModal={() =>  setLessonCompleted(false)} />
    </div>
  );
}
