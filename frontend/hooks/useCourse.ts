import { useState, useCallback } from 'react';
import axiosInstance from '../axiosInstance';

interface LessonPayload {
  roadmapId: string;
  lessonIndex: number;
  unitIndex: number;
}

interface IncorrectThemesPayload {
  incorrectThemes: string[];
}

interface PointsPayload {
  points: number;
}

const useCourseApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const generateLessonMath = useCallback(async (payload: LessonPayload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/course/generate-lesson-math', payload);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateLessonCritical = useCallback(async (payload: LessonPayload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/course/generate-lesson-critical', payload);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleIncorrectThemes = useCallback(async (payload: IncorrectThemesPayload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/course/handle-incorrect-themes', payload);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateXpAndStreak = useCallback(async (payload: PointsPayload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/course/update-xp-and-streak', payload);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetTodaysXp = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/course/reset-todays-xp');
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    generateLessonMath,
    generateLessonCritical,
    handleIncorrectThemes,
    updateXpAndStreak,
    resetTodaysXp,
  };
};

export default useCourseApi;
