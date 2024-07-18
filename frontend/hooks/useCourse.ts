import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; // Assuming axiosInstance is properly configured
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { useSession } from 'next-auth/react';
import { PayloadCourse } from '@/types/useCourse.types';
// Define types for API responses
type GenerateLessonMathResponse = Roadmap; 
type GenerateLessonCriticalResponse = Roadmap; 
type HandleIncorrectThemesResponse = any; 
type UpdateXpAndStreakResponse = any; 
type ResetTodaysXpResponse = any; 
type GeTUserData = any; 

const useCourseApi = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const useGenerateLessonMath = () => {
    return useMutation<GenerateLessonMathResponse, Error, any>(
      async (payload: PayloadCourse) => {
        const { data } = await axiosInstance.post('/course/generate-lesson-math', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('generateLessonMath');
        },
      }
    );
  };

  const useGenerateLessonCritical = () => {
    return useMutation<GenerateLessonCriticalResponse, Error, any>(
      async (payload:PayloadCourse) => {
        const { data } = await axiosInstance.post('/course/generate-lesson-critical', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('generateLessonCritical');
        },
      }
    );
  };

  const useHandleIncorrectThemes = () => {
    return useMutation<HandleIncorrectThemesResponse, Error, any>(
      async (payload) => {
        const { data } = await axiosInstance.post('/handle-incorrect-themes', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('handleIncorrectThemes');
        },
      }
    );
  };

  // Update XP and streak
  const useUpdateXpAndStreak = () => {
    return useMutation<UpdateXpAndStreakResponse, Error, any>(
      async (payload) => {
        const { data } = await axiosInstance.post('/update-xp-and-streak', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('updateXpAndStreak');
        },
      }
    );
  };

  // Reset today's XP
  const useResetTodaysXp = () => {
    return useMutation<ResetTodaysXpResponse, Error>(
      async () => {
        const { data } = await axiosInstance.post('/reset-todays-xp', null, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('resetTodaysXp');
        },
      }
    );
  };

  const useGetUser = () => {
    return useQuery<GeTUserData, Error>(
      'getUser',
      async () => {
        const { data } = await axiosInstance.get('/course/get-user', {
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`
          }
        });
        return data;
      }
    );
  };

  return {
    useGenerateLessonMath,
    useGenerateLessonCritical,
    useHandleIncorrectThemes,
    useUpdateXpAndStreak,
    useResetTodaysXp,
    useGetUser,
  };
};

export default useCourseApi;
