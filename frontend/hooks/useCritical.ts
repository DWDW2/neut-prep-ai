import axios from 'axios';
import { BASE_URL } from '@/constants';
import { useCriticalResponseType, criticalTestType, useCriticalUpdateResponseType } from '@/types/useCritical.types';
import { useState } from 'react';
import { UseMathUpdateResponseType } from '@/types/useMath.types';

const useCritical = () => {
  const [criticalUrl, setCriticalUrl] = useState<useCriticalResponseType>({id: ''});
  const [criticalData, setCriticalData] = useState<criticalTestType | null>(null);
  const [criticalDataAll, setCriticalDataAll] = useState<criticalTestType[] | null>(null);
  const [finished , setFinished] = useState<boolean>(false)
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
      return response.data
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

  const handleSubmitTest = async (id: string, userAnswers: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${BASE_URL}/critical/${id}`, userAnswers);
      if (response.status === 200) {
        console.log('Test submitted successfully!');
        console.log(response.data)
        return response.data
      } else {
        console.error('Error submitting test:', response.status);
        setError(response.data);
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      setError(error);
    } finally {
      setIsLoading(false);
      setFinished(true);
    }
  };
  
  return {
    criticalData,
    isLoading,
    error,
    fetchCriticalData,
    fetchById,
    criticalUrl,
    getAllCriticalTests,
    criticalDataAll,
    handleSubmitTest,
    finished,
    setFinished
  };
};

export default useCritical;
