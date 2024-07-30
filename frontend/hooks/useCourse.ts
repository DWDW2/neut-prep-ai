import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; 
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { useSession } from 'next-auth/react';
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

const useCourseApi = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const useGenerateLesson = () => {
    return useMutation<GenerateLessonResponse, Error, PayloadCourse>(
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
          queryClient.invalidateQueries('generateLesson');
        },
      }
    );
  };

  const useHandleIncorrectThemes = () => {
    return useMutation<HandleThemesResponse, Error, any>(
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
    return useMutation<HandleThemesResponse, Error, any>(
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
          queryClient.invalidateQueries('handleBestThemes');
        },
      }
    );
  };

  const useUpdateXpByLesson = () => {
    return useMutation<UpdateXpAndStreakResponse, Error, useUpdateXpByLessonResponse>(
      async (payload: useUpdateXpByLessonResponse) => {
        const { data } = await axiosInstance.post('/course/update-xp-lesson', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      }
    );
  };

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
          queryClient.invalidateQueries('updateStreak');
        },
      }
    );
  };

  const useGetUser = () => {
    return useQuery<GetUserData, Error>(
      'getUser',
      async () => {
        const { data } = await axiosInstance.get('/course/get-user', {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        });
        return data;
      },
      {
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
      "updateXp",
      async () => {
        const { data } = await axiosInstance.get('/course/refresh-todays-xp', {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        });
        return data;
      },
      {
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
        const { data } = await axiosInstance.get('/course/get-all-users', {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        });
        return data;
      }
    );
  };

  const useGetLesson = () => {
    return useMutation<Lesson[], Error, UseGetLessonPayload>(
      async (payload) => {
        const { data } = await axiosInstance.post('/course/get-lesson', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      }
    );
  };

  const useSetFinished = () => {
    return useMutation<any, Error, SetFinishedPayload>(
      async (payload) => {
        const { data } = await axiosInstance.post('/course/set-finished', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
        queryClient.invalidateQueries('getRoadmap')
      }
    );
  };

  const useSetXpGained = () => {
    return useMutation<any, Error, SetXpGainedPayload>(
      async (payload) => {
        const { data } = await axiosInstance.post('/course/set-xp-gained', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        queryClient.invalidateQueries('getRoadmap')
        return data;
      }
    );
  };

  const useHandleNextLesson = () => {
    return useMutation<any, Error, HandleNextLessonPayload>(
      async (payload) => {
        const { data } = await axiosInstance.post('/course/handle-next-lesson', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
      }
    );
  };

  const useSetUserAnswers = () => {
    return useMutation<any, Error, useSetUserAnswers>(
      async (payload) => {
        const { data } = await axiosInstance.post('/course/set-user-answers', payload, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        return data;
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
