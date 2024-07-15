// useRoadmapApi.ts

import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../axiosInstance';
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';

const useRoadmapApi = () => {
  const queryClient = useQueryClient();

  const generateCriticalRoadmap = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation<Roadmap>(() => axiosInstance.post<Roadmap>('/roadmap/generate-critical-roadmap'), {
      onSuccess: (data) => {
        queryClient.setQueryData<Roadmap>('criticalRoadmap', data);
      },
    });
  };

  const generateMathRoadmap = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation<Roadmap, Error, RoadmapPayload>((payload) =>
      axiosInstance.post<Roadmap>('/roadmap/generate-math-roadmap', payload)
    , {
      onSuccess: (data) => {
        queryClient.setQueryData<Roadmap>(['mathRoadmap', payload], data);
      },
    });
  };

  const getMathRoadmap = (userId: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Roadmap, Error>(['mathRoadmap', userId], () =>
      axiosInstance.get<Roadmap>(`/roadmap/users/${userId}/math-roadmap`).then((res) => res.data)
    );
  };

  const getCriticalThinkingRoadmap = (userId: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Roadmap, Error>(['criticalRoadmap', userId], () =>
      axiosInstance.get<Roadmap>(`/roadmap/users/${userId}/critical-roadmap`).then((res) => res.data)
    );
  };

  const saveRoadmap = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation<Roadmap, Error, RoadmapPayload>((payload) =>
      axiosInstance.post<Roadmap>('/roadmap/roadmaps', payload)
    , {
      onSuccess: () => {
        queryClient.invalidateQueries('roadmaps');
      },
    });
  };

  const updateRoadmap = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation<Roadmap, Error, { id: string; payload: RoadmapPayload }>(
      ({ id, payload }) => axiosInstance.put<Roadmap>(`/roadmap/roadmaps/${id}`, payload),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('roadmaps');
        },
      }
    );
  };

  const deleteRoadmap = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation<void, Error, string>((id) =>
      axiosInstance.delete(`/roadmap/roadmaps/${id}`)
    , {
      onSuccess: () => {
        queryClient.invalidateQueries('roadmaps');
      },
    });
  };

  return {
    generateCriticalRoadmap,
    generateMathRoadmap,
    getMathRoadmap,
    getCriticalThinkingRoadmap,
    saveRoadmap,
    updateRoadmap,
    deleteRoadmap,
  };
};

export default useRoadmapApi;
