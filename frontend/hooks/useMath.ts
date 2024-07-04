import axios from 'axios';
import { BASE_URL } from '@/constants';
import { UseMathResponseType, UseMathUpdateResponseType, mathTestType } from '@/types/useMath.types';
import { useState } from 'react';

const useMath = () => {
  const [mathUrl, setMathUrl] = useState<UseMathResponseType>({id: ''});
  const [mathData, setMathData] = useState<mathTestType | null>(null);
  const [mathDataAll, setMathDataAll] = useState<mathTestType[] | null>(null);
  const [finished , setFinished] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchMathData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/math`);
      const data:UseMathResponseType = response.data
      setMathUrl(data);
    } catch (error) {
      console.error('Error fetching math data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchById = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/math/${id}`);
      setMathData(response.data);
    } catch (error) {
      console.error('Error fetching math data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getAllMathTests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/math/all`);
      setMathDataAll(response.data);
    } catch (error) {
      console.error('Error fetching math data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmitTest = async (id: string, userAnswers: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${BASE_URL}/math/${id}`, userAnswers);
      if (response.status === 200) {
        console.log('Test submitted successfully!');
        return response.data;
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
    mathData,
    isLoading,
    error,
    fetchMathData,
    fetchById,
    mathUrl,
    getAllMathTests,
    mathDataAll,
    handleSubmitTest,
    finished,
    setFinished
  };
};

export default useMath;
