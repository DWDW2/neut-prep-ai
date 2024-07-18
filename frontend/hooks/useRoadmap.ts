import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '@/axiosInstance'; // Adjust path as per your setup
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { getSession } from 'next-auth/react';

const getAuthHeader = async () => {
  const session = await getSession();
  console.log(session?.accessToken)
  console.log(axiosInstance)
  return session?.accessToken;
};

export const useRoadmapQuery = () => {
  const queryClient = useQueryClient();

  // Function to fetch auth header
  const fetchAuthHeader = async () => {
    try {
      return await getAuthHeader(); // Assuming getAuthHeader handles the async session retrieval
    } catch (error) {
      console.error('Error fetching auth header:', error);
      throw error; // Handle or rethrow the error as needed
    }
  };

  // Queries
  const useGenerateCriticalRoadmap = () => 
    useQuery('criticalRoadmap', async () => {
      const authHeader = await fetchAuthHeader();
      return axiosInstance.get<Roadmap>('/roadmap/critical/generate-and-get-roadmapCritical', {
        headers: { Authorization: authHeader }
      }).then(res => res.data);
    });

  const useGenerateMathRoadmap = () => 
    useQuery('mathRoadmap', async () => {
      const authHeader = await fetchAuthHeader();
      return axiosInstance.get<Roadmap>('/roadmap/math/generate-and-get-roadmapMath', {
        headers: { Authorization: authHeader }
      }).then(res => res.data);
    });

  const useGetMathRoadmap = (userId: string) => 
    useQuery(['mathRoadmap', userId], async () => {
      const authHeader = await fetchAuthHeader();
      return axiosInstance.get<Roadmap>(`/roadmap/math/${userId}`, {
        headers: { Authorization: authHeader }
      }).then(res => res.data);
    });

  // Mutations (example for useGenerateMathRoadmap)


  // Other mutations and queries follow a similar pattern

  return {
    useGenerateCriticalRoadmap,
    useGenerateMathRoadmap,
    useGetMathRoadmap,
    // Add other useQuery and useMutation hooks here
  };
};
