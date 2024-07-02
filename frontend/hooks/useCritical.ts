import axios from 'axios';
import { BASE_URL } from '@/constants';
import { useCriticalResponseType } from '@/types/useCritical.types';
import { useState } from 'react';

const useCritical = () => {
  const [criticalData, setCriticalData] = useState<useCriticalResponseType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const fetchCriticalData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/critical`);
      setCriticalData(response.data);
    } catch (error) {
      console.error('Error fetching critical data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    criticalData,
    isLoading,
    error,
    fetchCriticalData,
  };
};

export default useCritical;
