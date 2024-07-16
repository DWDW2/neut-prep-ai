// useAuth.ts
import { useState, useEffect } from 'react';
import { useSession } from '@clerk/nextjs';

const useAuth = () => {
  const { session } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (session) {
        const fetchedToken = await session.getToken();
        setToken(fetchedToken || null);
      }
    };

    fetchToken();
  }, [session]);
  console.log(token)
  return { token };
};

export default useAuth;
