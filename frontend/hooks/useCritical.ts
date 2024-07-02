import axios from 'axios';
import { BASE_URL } from '@/constants';
import { useCriticalResponseType, criticalTestType } from '@/types/useCritical.types';
import { useState } from 'react';

const useCritical = () => {
  const [criticalUrl, setCriticalUrl] = useState<useCriticalResponseType>({id: ''});
  const [criticalData, setCriticalData] = useState<criticalTestType | null>(null);
  const [criticalDataAll, setCriticalDataAll] = useState<criticalTestType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const fetchCriticalData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/critical`);
      const data:useCriticalResponseType = response.data
      setCriticalUrl(data);
    } catch (error) {
      console.error('Error fetching critical data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchById = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/critical/${id}`);
      setCriticalData(response.data);
    } catch (error) {
      console.error('Error fetching critical data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
      
    }
  }

  const getAllCriticalTests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/critical/all`);
      setCriticalDataAll(response.data);
    } catch (error) {
      console.error('Error fetching critical data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return {
    criticalData,
    isLoading,
    error,
    fetchCriticalData,
    fetchById,
    criticalUrl,
    getAllCriticalTests,
    criticalDataAll,
  };
};

export default useCritical;
