"use client";

import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

const useNavbarLayout = () => {
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });

  return {
    dataProfile,
  };
};

export default useNavbarLayout;
