"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const useProfile = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const { data } = await authServices.getProfile();
        return data.data;
      } catch (error) {
        setToaster({
          type: "error",
          message: error.response?.data?.message || "Gagal memuat profil",
        });
        throw error;
      }
    },
  });

  const {
    mutateAsync: updateProfile,
    isPending: isPendingUpdateProfile,
  } = useMutation({
    mutationFn: async (fullName) => {
      try {
        const { data } = await authServices.updateProfile({ fullName });
        return data.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      refetchProfile();
      setToaster({
        type: "success",
        message: "Profil berhasil diperbarui",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.response?.data?.message || "Gagal memperbarui profil",
      });
    },
  });

  // const {
  //   mutateAsync: updatePassword,
  //   isPending: isPendingUpdatePassword,
  // } = useMutation({
  //   mutationFn: async (newPassword) => {
  //     try {
  //       const { data } = await authServices.updatePassword({ newPassword });
  //       return data.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   onSuccess: () => {
  //     setToaster({
  //       type: "success",
  //       message: "Password berhasil diperbarui",
  //     });
  //   },
  //   onError: (error) => {
  //     setToaster({
  //       type: "error",
  //       message: error.response?.data?.message || "Gagal memperbarui password",
  //     });
  //   },
  // });

  const handleUpdateProfile = async (fullName) => {
    await updateProfile(fullName);
  };

  // const handleUpdatePassword = async (newPassword) => {
  //   await updatePassword(newPassword);
  // };

  return {
    dataProfile,
    isLoadingProfile,
    handleUpdateProfile,
    handleUpdatePassword,
    isPendingUpdateProfile,
    isPendingUpdatePassword,
  };
};

export default useProfile;
