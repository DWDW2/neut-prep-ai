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
    useMutation<Roadmap, Error>(
      async (payload) => {
        const authHeader = await fetchAuthHeader();
        return axiosInstance
          .post<Roadmap>('/roadmap/generate-roadmap', payload, {
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
    useQuery<getRoadmapResponse, Error>(
      'getRoadmap',
      async () => {
        const authHeader = await fetchAuthHeader();
        return axiosInstance
          .get<getRoadmapResponse>('/roadmap/get-roadmap', {
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
