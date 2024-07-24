import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; 
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { getSession } from 'next-auth/react';

const getAuthHeader = async () => {
  const session = await getSession();
  console.log(session?.accessToken);
  console.log(axiosInstance);
  return session?.accessToken;
};

export const useRoadmapQuery = () => {
  const queryClient = useQueryClient();

  const fetchAuthHeader = async () => {
    try {
      return await getAuthHeader();
    } catch (error) {
      console.error('Error fetching auth header:', error);
      throw error;
    }
  };

  const useGenerateCriticalRoadmap = () =>
    useQuery(
      'criticalRoadmap',
      async () => {
        const authHeader = await fetchAuthHeader();
        return axiosInstance
          .get<Roadmap>('/roadmap/critical/generate-and-get-roadmapCritical', {
            headers: { Authorization: authHeader },
          })
          .then((res) => res.data);
      },
      {
        staleTime: 120000, 
        cacheTime: 300000, 
      }
    );

  const useGenerateMathRoadmap = () =>
    useQuery(
      'mathRoadmap',
      async () => {
        const authHeader = await fetchAuthHeader();
        return axiosInstance
          .get<Roadmap>('/roadmap/math/generate-and-get-roadmapMath', {
            headers: { Authorization: authHeader },
          })
          .then((res) => res.data);
      },
      {
        staleTime: 120000, 
        cacheTime: 300000, 
      }
    );

  const useGetMathRoadmap = (userId: string) =>
    useQuery(
      ['mathRoadmap', userId],
      async () => {
        const authHeader = await fetchAuthHeader();
        return axiosInstance
          .get<Roadmap>(`/roadmap/math/${userId}`, {
            headers: { Authorization: authHeader },
          })
          .then((res) => res.data);
      },
      {
        staleTime: 120000, 
        cacheTime: 300000, 
      }
    );

  return {
    useGenerateCriticalRoadmap,
    useGenerateMathRoadmap,
    useGetMathRoadmap,
  };
};
