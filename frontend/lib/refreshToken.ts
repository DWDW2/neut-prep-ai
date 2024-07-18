"use client";
import axiosInstance from "@/axiosInstance";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  const route = useRouter()
  const refreshToken = async () => {
    const res = await axiosInstance.post("/user/refresh-token", {
      refresh: session?.refreshToken,
    });

    if (session) session.accessToken = res.data.accessToken;
    else route.push('/login')
  };
  return refreshToken;
};