import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; 
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { getSession, signOut } from 'next-auth/react';

interface getRoadmapResponse {
  mathRoadmap: Roadmap;
  criticalRoadmap: Roadmap;
} 

const getAuthHeader = async () => {
  const session = await getSession();
  return session?.accessToken ? `Bearer ${session.accessToken}` : '';
};

const handleError = async (error: any) => {
  if (error.response && error.response.status === 401) {
    await signOut({ callbackUrl: '/auth/login' });
  }
  return Promise.reject(error);
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
      async (payload) => {
        const authHeader = await fetchAuthHeader();
        if (!authHeader) throw new Error('No session');
        try {
          const { data } = await axiosInstance.post<Roadmap>('/roadmap/generate-roadmap', payload, {
            headers: { Authorization: authHeader },
          });
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('getRoadmap');
        },
      }
    );

  const useGetRoadmap = () =>
    useQuery<getRoadmapResponse | undefined, Error>(
      'getRoadmap',
      async () => {
        const authHeader = await fetchAuthHeader();
        if (!authHeader) throw new Error('No session');
        try {
          const { data } = await axiosInstance.get<getRoadmapResponse>('/roadmap/get-roadmap', {
            headers: { Authorization: authHeader },
          });
          return data;
        } catch (error) {
          await handleError(error);
        }
      },
      {
        enabled: !!getAuthHeader(), 
        staleTime: 0, 
        cacheTime: 300000, 
        refetchOnWindowFocus: true, 
        refetchInterval: 60000, 
      }
    );

  return {
    useGenerateRoadmap,
    useGetRoadmap,
  };
};
