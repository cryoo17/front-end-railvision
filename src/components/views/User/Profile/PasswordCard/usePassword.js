"use client";

import { useContext } from "react";
import * as yup from "yup";
import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  password: yup.string().required("New password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});

const usePassword = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const updatePassword = async (payload) => {
    const { data } = await authServices.updatePassword(payload);
    return data;
  };

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
  } = useMutation({
    mutationFn: (payload) => updatePassword(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      resetUpdatePassword();
      setValueUpdatePassword("oldPassword", "");
      setValueUpdatePassword("password", "");
      setValueUpdatePassword("confirmPassword", "");
      setToaster({
        type: "success",
        message: "Success update password",
      });
    },
  });

  const handleUpdatePassword = (data) => mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorsUpdatePassword,
    isPendingMutateUpdatePassword,
    handleUpdatePassword,
  };
};

export default usePassword;
