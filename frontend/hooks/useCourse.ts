import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; 
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { useSession, signOut } from 'next-auth/react';
import { UserType } from '../types/User.types';
import { PayloadCourse, UpdatePayloadCourse, Lesson, SetFinishedPayload, SetXpGainedPayload, HandleNextLessonPayload, UseGetLessonPayload, useSetUserAnswers } from '@/types/useCourse.types';

type GenerateLessonResponse = Lesson[];
type HandleThemesResponse = string[];
type UpdateXpAndStreakResponse = any; 
type useUpdateXpByLessonResponse = {
  points: number
}; 
type ResetTodaysXpResponse = any; 
type GetUserData = UserType;
type UpdateUserResponse = any; 
type GetAllUsersResponse = UserType[];
type useGetLesson = {
  incorrectIndexes: number[];
  lessons: Lesson[];
}

const useCourseApi = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  const handleError = async (error: any) => {
    if (error.response && error.response.status === 401 && session) {
      await signOut({ callbackUrl: '/login' });
    }
    return Promise.reject(error);
  };

  const useGenerateLesson = () => {
    return useMutation<GenerateLessonResponse, Error, PayloadCourse>(
      async (payload: PayloadCourse) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/generate-lesson', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('generateLesson');
        },
      }
    );
  };

  const useHandleIncorrectThemes = () => {
    return useMutation<HandleThemesResponse, Error, any>(
      async (payload) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/handle-incorrect-themes', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('handleIncorrectThemes');
        },
      }
    );
  };

  const useHandleBestThemes = () => {
    return useMutation<HandleThemesResponse, Error, any>(
      async (payload) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/handle-best-themes', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('handleBestThemes');
        },
      }
    );
  };

  const useUpdateXpByLesson = () => {
    return useMutation<UpdateXpAndStreakResponse, Error, useUpdateXpByLessonResponse>(
      async (payload: useUpdateXpByLessonResponse) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/update-xp-lesson', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      }
    );
  };

  const useUpdateStreak = () => {
    return useMutation<ResetTodaysXpResponse, Error>(
      async () => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/update-streak', null, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('updateStreak');
        },
      }
    );
  };

  const useGetUser = () => {
    return useQuery<GetUserData, Error>(
      'getUser',
      async () => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.get('/course/get-user', authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        enabled: !!session, // Conditionally enable based on session
        staleTime: 0, 
        cacheTime: 300000, 
        refetchOnWindowFocus: true, 
        refetchInterval: 60000, 
      }
    );
  };

  const useUpdateUser = () => {
    return useMutation<UpdateUserResponse, Error, UpdatePayloadCourse>(
      async (payload: UpdatePayloadCourse) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.put('/course/update-user', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('getUser'); 
        },
      }
    );
  };

  const useUpdateXp = () => {
    return useQuery(
      "updateXp",
      async () => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.get('/course/refresh-todays-xp', authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        enabled: !!session, // Conditionally enable based on session
        refetchInterval: 24 * 60 * 60 * 1000,
        cacheTime: 24 * 60 * 60 * 1000,
        staleTime: Infinity,
      }
    );
  };

  const useGetAllUsers = () => {
    return useQuery<GetAllUsersResponse, Error>(
      "getAllUsers",
      async () => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.get('/course/get-all-users', authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        enabled: !!session, // Conditionally enable based on session
      }
    );
  };

  const useGetLesson = () => {
    return useMutation<useGetLesson, Error, UseGetLessonPayload>(
      async (payload) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/get-lesson', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      }
    );
  };

  const useSetFinished = () => {
    return useMutation<any, Error, SetFinishedPayload>(
      async (payload) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/set-finished', payload, authHeaders);
          queryClient.invalidateQueries('getRoadmap');
          return data;
        } catch (error) {
          await handleError(error);
        }
      }
    );
  };

  const useSetXpGained = () => {
    return useMutation<any, Error, SetXpGainedPayload>(
      async (payload) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/set-xp-gained', payload, authHeaders);
          queryClient.invalidateQueries('getRoadmap');
          return data;
        } catch (error) {
          await handleError(error);
        }
      }
    );
  };

  const useHandleNextLesson = () => {
    return useMutation<any, Error, HandleNextLessonPayload>(
      async (payload) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/handle-next-lesson', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      }
    );
  };

  const useSetUserAnswers = () => {
    return useMutation<any, Error, useSetUserAnswers>(
      async (payload) => {
        if (!session) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post('/course/set-user-answers', payload, authHeaders);
          return data;
        } catch (error) {
          await handleError(error);
        }
      }
    );
  }

  return {
    useGenerateLesson,
    useHandleIncorrectThemes,
    useHandleBestThemes,
    useUpdateXpByLesson,
    useUpdateStreak,
    useGetUser,
    useUpdateUser,
    useUpdateXp,
    useGetAllUsers,
    useGetLesson,
    useSetFinished,
    useSetXpGained,
    useHandleNextLesson,
    useSetUserAnswers
  };
};

export default useCourseApi;
