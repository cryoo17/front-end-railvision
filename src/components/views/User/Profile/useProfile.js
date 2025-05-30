"use client";

import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: () => getProfile(),
  });

  return {
    dataProfile,
    isLoadingProfile,
  };
};

export default useProfile;
