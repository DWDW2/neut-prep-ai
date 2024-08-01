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
import LessonCompleteModal from "@/components/testing/AuthFormaModal";
import useStore from "@/hooks/useStore";

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

export default function CriticalDetailed({ }: Props) {
  const router = useRouter();
  const { useGetRoadmap } = useRoadmapQuery();
  const { useGetUser, useUpdateStreak, useUpdateXp } = useCourseApi();
  const { data: session } = useSession();
  const [isLessonActive, setLessonActive] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false); 
  const [showLessonCompleteModal, setShowLessonCompleteModal] = useState(false);  
  const [roadmapContent, setRoadmapContent] = useState<Roadmap | null>(null);

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useGetUser();
  const { data: updatedXp } = useUpdateXp();
  const { mutate: mutateStreak } = useUpdateStreak();
  const { data: RoadMapCritical, isLoading: isLoadingCritical, isError: isErrorCritical, refetch: refetchRoadmap } = useGetRoadmap();
  const { isLessonCompleted, setLessonCompleted } = useStore();  


  const handleFetchError = (error: any) => {
    if (error.response?.status === 401) {
      router.push('/login');
    } else {
      toast.error('An error occurred while fetching data.');
    }
  };



  const handleLessonClick = ({ lessonIndex, sectionIndex, roadmapId, xp, questionType, locked, lessonContent }: handleLesson) => {
    if (!locked) {
      router.push(`/testing/app/critical/${roadmapId}/${sectionIndex}/${lessonIndex}/${xp}/${questionType}/${lessonContent ? lessonContent : ''}`);
    } else {
      toast.info('Complete previous lessons to unlock this one');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session && !isLoadingUser) {
        try {
          if(!user){
            router.push('/login')
          }
          if (user?.roadmapCriticalId !== null) {
            refetchRoadmap();
          }
          
          if (isLoadingCritical) return;
          if (isErrorCritical) {
            toast.error('An error occurred while loading the lesson. Please try again.');
          } else {
            setRoadmapContent(RoadMapCritical?.criticalRoadmap || null);
          }
        } catch (error) {
          handleFetchError(error);
        }
      } else {
        const criticalHard = await fetch('/criticalHard.json').then(res => res.json()).then((data:Roadmap) => {return data})
        setRoadmapContent(criticalHard);
      }
    };

    fetchData();
    const intervalId = setInterval(() => fetchData(), 10000);
    return () => clearInterval(intervalId);
  }, [session, user, RoadMapCritical, isLoadingCritical, isErrorCritical, refetchRoadmap]);

  useEffect(() => {
    if (session && user) {
      const lastUpdatedDate = new Date(user.lastActivityDate || 0);
      const today = new Date();
      if (lastUpdatedDate.toDateString() !== today.toDateString()) {
        mutateStreak();
      }
    }
  }, [session, user, mutateStreak]);

  useEffect(() => {
    if (session && user?.todaysXp! >= 20) { 
      setShowCongratulationsModal(true);
    }
  }, [session, user]);

  useEffect(() => {
    if (isLessonCompleted) {
      setShowLessonCompleteModal(true);
      setLessonCompleted(false);  
    }
  }, [isLessonCompleted]);

  const closeModal = () => {
    setShowCongratulationsModal(false);
    setShowLessonCompleteModal(false);
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
            onClick={() => handleLessonClick({ roadmapId: RoadMapCritical?.criticalRoadmap._id || '', sectionIndex: index, lessonIndex, xp: lesson.xp, questionType: section.questionType, locked: lesson.locked, lessonContent: lesson.lessonContent })}
          />
        ))}
      </div>
    ));
  }, [roadmapContent]);

  if (!roadmapContent && !isLoadingCritical) return <Loading />;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
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
      <CongratulationsModal show={showCongratulationsModal} onClose={closeModal} xp={user?.todaysXp || 0} />
      <LessonCompleteModal isModalOpen={showLessonCompleteModal} closeModal={closeModal} />
    </div>
  );
}
