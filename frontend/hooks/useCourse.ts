import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; 
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { useSession } from 'next-auth/react';
import {UserType} from '../types/User.types'
import { PayloadCourse, UpdatePayloadCourse, Lesson } from '@/types/useCourse.types';

type GenerateLessonMathResponse = Lesson[]
type GenerateLessonCriticalResponse = Lesson[]
type HandleIncorrectThemesResponse = string[]
type UpdateXpAndStreakResponse = any; 
type useUpdateXpByLessonResponse = {
  points: number
}; 
type ResetTodaysXpResponse = any; 
type GeTUserData = UserType
type UpdateUserResponse = any; 
type GetAllUsersResponse = UserType[]

const useCourseApi = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const useGenerateLessonMath = () => {
    return useMutation<GenerateLessonMathResponse, Error, PayloadCourse>(
      async (payload: PayloadCourse) => {
        const { data } = await axiosInstance.post('/course/generate-lesson', payload, {
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
    return useMutation<GenerateLessonCriticalResponse, Error, PayloadCourse>(
      async (payload:PayloadCourse) => {
        const { data } = await axiosInstance.post('/course/generate-lesson', payload, {
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

  const useHandleBestThemes = () => {
    return useMutation<HandleIncorrectThemesResponse, Error, any>(
      async (payload) => {
        const { data } = await axiosInstance.post('/course/handle-best-themes', payload, {
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
  }

  const useUpdateXpByLesson = () => {
    return useMutation(
      async (payload: useUpdateXpByLessonResponse) => {
        const { data } = await axiosInstance.post('/course/update-xp-lesson', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      }
    )
  }

  const useUpdateStreak = () => {
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
      },
      {
        refetchInterval: 300000,
        staleTime: Infinity,
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
          queryClient.invalidateQueries('getUser'); 
        },
      }
    );
  };

  const useUpdateXp = () => {
    return useQuery(
      "update-xp",
      async () => {
        const { data } = await axiosInstance.get('/course/update-xp', {
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`
          }
        });
        return data;
      },
      {
        refetchInterval: 24 * 60 * 60 * 1000,
        cacheTime: 24 * 60 * 60 * 1000,
        staleTime: Infinity,
      }
    )
  };

  const useGetAllUsers = () => {
    return useQuery<GetAllUsersResponse, Error>(
      "allusers",
      async () => {
        const { data } = await axiosInstance.get('/course/get-all-users', {
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`
          }
        });

        return data
      }
    )
  }

  return {
    useGenerateLessonMath,
    useGenerateLessonCritical,
    useHandleIncorrectThemes,
    useUpdateXp,
    useHandleBestThemes,
    useUpdateStreak,
    useGetUser,
    useUpdateXpByLesson,
    useUpdateUser,
    useGetAllUsers
  };
};

export default useCourseApi;
