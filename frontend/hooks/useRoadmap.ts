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

  const useGenerateRoadmap = () =>
    useMutation<Roadmap, Error, RoadmapPayload>(
      async (payload: RoadmapPayload) => {
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

  return {
    useGenerateRoadmap,
  };
};
