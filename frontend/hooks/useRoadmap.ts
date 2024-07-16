import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosInstance'; // Assuming you have your axiosInstance setup
import { RoadmapPayload, Roadmap } from '@/types/useRoadmap.types';
import { useSession } from '@clerk/nextjs';
import useAuth from './useauth';

// Define types for API responses
type GenerateCriticalRoadmapResponse = Roadmap;
type GenerateMathRoadmapResponse = Roadmap;
type GetMathRoadmapResponse = Roadmap;
type GetCriticalThinkingRoadmapResponse = Roadmap;
type SaveRoadmapResponse = Roadmap;
type GetRoadmapFromDbResponse = Roadmap;
type GetRoadmapByIdResponse = Roadmap;
type UpdateRoadmapResponse = Roadmap;
type DeleteRoadmapResponse = void;

const useRoadmapApi = () => {
  // States for caching, loading, and error
  const [criticalRoadmap, setCriticalRoadmap] = useState<Roadmap | null>(null);
  const [mathRoadmap, setMathRoadmap] = useState<Roadmap | null>(null);
  const [roadmapFromDb, setRoadmapFromDb] = useState<Roadmap | null>(null);
  const [roadmapById, setRoadmapById] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const {session} = useSession() 

  // Generate a critical roadmap
  const generateCriticalRoadmap = async (): Promise<GenerateCriticalRoadmapResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/roadmap/critical/generate-and-get-roadmapCritical');
      setCriticalRoadmap(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error generating critical roadmap:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a math roadmap
  const generateMathRoadmap = async (payload: RoadmapPayload): Promise<GenerateMathRoadmapResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/roadmap/math/generate-and-get-roadmapMath', payload);
      setMathRoadmap(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error generating math roadmap:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a math roadmap for a user
  const getMathRoadmap = async (userId: string): Promise<GetMathRoadmapResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/roadmap/math/${userId}`);
      setMathRoadmap(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error getting math roadmap:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a critical thinking roadmap for a user
  const getCriticalThinkingRoadmap = async (userId: string): Promise<GetCriticalThinkingRoadmapResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/roadmap/critical/${userId}`);
      setCriticalRoadmap(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error getting critical thinking roadmap:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Save a roadmap to the database
  const saveRoadmap = async (userId: string, payload: RoadmapPayload): Promise<SaveRoadmapResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(`/roadmap/${userId}`, payload);
      setRoadmapFromDb(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error saving roadmap:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a roadmap from the database for a user
  const getRoadmapFromDb = async (userId: string): Promise<GetRoadmapFromDbResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/roadmap/${userId}`);
      setRoadmapFromDb(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error getting roadmap from database:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a roadmap by its ID
  const getRoadmapById = async (roadmapId: string): Promise<GetRoadmapByIdResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/roadmap/id/${roadmapId}`);
      setRoadmapById(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error getting roadmap by ID:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a roadmap in the database
  const updateRoadmap = async (roadmapId: string, payload: RoadmapPayload): Promise<UpdateRoadmapResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/roadmap/id/${roadmapId}`, payload);
      setRoadmapById(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating roadmap:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a roadmap from the database
  const deleteRoadmap = async (roadmapId: string): Promise<DeleteRoadmapResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/roadmap/id/${roadmapId}`);
    } catch (error: any) {
      console.error('Error deleting roadmap:', error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  return {
    generateCriticalRoadmap,
    generateMathRoadmap,
    getMathRoadmap,
    getCriticalThinkingRoadmap,
    saveRoadmap,
    getRoadmapFromDb,
    getRoadmapById,
    updateRoadmap,
    deleteRoadmap,
    criticalRoadmap,
    mathRoadmap,
    roadmapFromDb,
    roadmapById,
    isLoading,
    error,
  };
};

export default useRoadmapApi;
