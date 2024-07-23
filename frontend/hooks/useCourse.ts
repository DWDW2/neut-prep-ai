import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; 
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { useSession } from 'next-auth/react';
import {UserType} from '../types/User.types'
import { PayloadCourse, UpdatePayloadCourse, Lesson } from '@/types/useCourse.types';

type GenerateLessonMathResponse = {
  statement: string;
  question: string;
  options: string[];
  rightAnswer: number;
  type: string;
  explanation: string;
}[]
type GenerateLessonCriticalResponse = Lesson[]
type HandleIncorrectThemesResponse = string[]
type UpdateXpAndStreakResponse = any; 
type ResetTodaysXpResponse = any; 
type GeTUserData = UserType
type UpdateUserResponse = any; 


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
        const { data } = await axiosInstance.post('/course/handle-incorrect-themes', payload, {
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

  const useUpdateXpAndStreak = () => {
    return useMutation<UpdateXpAndStreakResponse, Error, any>(
      async (payload) => {
        const { data } = await axiosInstance.post('/course/update-xp', payload, {
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

  const useResetTodaysXp = () => {
    return useMutation<ResetTodaysXpResponse, Error>(
      async () => {
        const { data } = await axiosInstance.post('/course/update-streak', null, {
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

  const useUpdateUser = () => {
    return useMutation<UpdateUserResponse, Error, UpdatePayloadCourse>(
      async (payload: UpdatePayloadCourse) => {
        const { data } = await axiosInstance.put('/course/update-user', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('getUser'); // Invalidate the user data query
        },
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
    useUpdateUser,
  };
};

export default useCourseApi;
