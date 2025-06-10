"use client";

import { useContext } from "react";
import useMediaHandling from "@/hooks/useMediaHandling";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToasterContext } from "@/contexts/ToasterContext";
import predictionServices from "@/services/prediction.service";

const schema = yup.object().shape({
  name: yup.string().required("Please input station name"),
  icon: yup.mixed().required("Please input picture"),
});

const useDashboard = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("icon");
  const fileUrl = getValues("icon");

  const handleUploadIcon = (
    files,
    onChange,
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
  };

  const handleDeleteIcon = (
      onChange,
    ) => {
      handleDeleteFile(fileUrl, () => onChange(undefined));
    };
  
    const handleOnClose = (onClose) => {
      handleDeleteFile(fileUrl, () => {
        reset();
        onClose();
      });
    };
  
    const addPrediction = async (payload) => {
      const res = await predictionServices.addPrediction(payload);
      const { data } = res;
      return data;
    };
  
    const {
      mutate: mutateAddPrediction,
      isPending: isPendingMutateAddPrediction,
      isSuccess: isSuccessMutateAddPrediction,
    } = useMutation({
      mutationFn: addPrediction,
      onError: (errors) => {
        setToaster({
          type: "error",
          message: errors.message,
        });
      },
      onSuccess: () => {
        setToaster({
          type: "success",
          message: "Success add prediction",
        });
        reset();
      },
    });
  
    const handleAddPrediction = (data) => mutateAddPrediction(data);

    return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddPrediction,
    isPendingMutateAddPrediction,
    isSuccessMutateAddPrediction,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose,
    preview,
  };
};

export default useDashboard;
