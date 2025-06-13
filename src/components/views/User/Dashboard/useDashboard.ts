import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import predictionServices from "@/services/prediction.service";
import {
  IPredictionForm,
  IPredictPayload,
  IPredictionResult,
} from "@/types/Predict";

// Validation schema based on IPredictionForm
const schema = yup.object().shape({
  name: yup.string().required("Please input station name"),
  imageUrl: yup
    .mixed<FileList | string>()
    .required("Please input an image for prediction"),
});

const useDashboard = () => {
  const { setToaster } = useContext(ToasterContext);
  const [predictionResult, setPredictionResult] =
    useState<IPredictionResult | null>(null);

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
    // reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      imageUrl: undefined,
    },
  });

  const preview = watch("imageUrl");
  const fileUrl = getValues("imageUrl");

  const handleUploadImage = (
    files: FileList,
    onChange: (file: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (url: string) => {
      if (url) {
        setValue("imageUrl", url, { shouldValidate: true });
      }
    });
  };

  const handleDeleteImage = (
    onChange: (file: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => {
      onChange(undefined);
      setPredictionResult(null); // Clear result if image is deleted
    });
  };

  const addPrediction = async (payload: IPredictPayload) => {
    const res = await predictionServices.addPrediction(payload);
    // The actual prediction data is in res.data.data
    return res.data.data as IPredictionResult;
  };

  const {
    mutate: mutateAddPrediction,
    isPending: isPendingMutateAddPrediction,
  } = useMutation({
    mutationFn: addPrediction,
    onSuccess: (data) => {
      setToaster({
        type: "success",
        message: "Prediction successful!",
      });
      setPredictionResult(data); // Set the result to state
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message || "Prediction failed. Please try again.",
      });
      setPredictionResult(null);
    },
  });

  const handleAddPrediction = (data: IPredictionForm) => {
    // Ensure imageUrl is a string before mutating
    if (typeof data.imageUrl === "string") {
      const payload: IPredictPayload = {
        name: data.name || "Unnamed", // Fallback for name
        imageUrl: data.imageUrl,
      };
      mutateAddPrediction(payload);
    } else {
      setToaster({
        type: "error",
        message: "Image URL is missing.",
      });
    }
  };

  return {
    control,
    errors,
    preview,
    predictionResult,
    handleSubmitForm,
    handleAddPrediction,
    handleUploadImage,
    handleDeleteImage,
    isPendingMutateAddPrediction,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  };
};

export default useDashboard;
