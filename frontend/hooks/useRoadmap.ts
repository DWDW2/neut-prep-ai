import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; 
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { getSession } from 'next-auth/react';

interface getRoadmapResponse {
  mathRoadmap: Roadmap;
  criticalRoadmap: Roadmap;
}

const getAuthHeader = async () => {
  const session = await getSession();
  return session?.accessToken ? `Bearer ${session.accessToken}` : '';
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

  const useGenerateRoadmap = () =>
    useMutation<Roadmap, Error, RoadmapPayload>(
      async (payload: RoadmapPayload) => {
        const authHeader = await fetchAuthHeader();
        return axiosInstance
          .post<Roadmap>('/generate-roadmap', payload, {
            headers: { Authorization: authHeader },
          })
          .then((res) => res.data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('generateRoadmap');
        },
      }
    );

  const useGetRoadmap = () =>
    useQuery<Roadmap, Error>(
      'getRoadmap',
      async () => {
        const authHeader = await fetchAuthHeader();
        return axiosInstance
          .get<Roadmap>('/get-roadmap', {
            headers: { Authorization: authHeader },
          })
          .then((res) => res.data);
      },
      {
        staleTime: Infinity,
        cacheTime: 300000,
      }
    );

  return {
    useGenerateRoadmap,
    useGetRoadmap,
  };
};
