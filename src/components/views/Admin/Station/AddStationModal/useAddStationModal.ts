"use client";

import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import stationServices from "@/services/station.service";
import { IStation, IStationForm } from "@/types/Station";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input station name"),
  slug: yup.string().required("Please input station slug"),
  category: yup.string().required("Please select station category"),
  description: yup.string().required("Please input station description"),
  region: yup.string().required("Please select station location"),
  latitude: yup.string().required("Please input latitude"),
  longitude: yup.string().required("Please input longitude"),
  icon: yup.mixed<FileList | string>().required("Please input station icon"),
});

const useAddStationModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const debounce = useDebounce();
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
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  const [searchCity, setSearchCity] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchCity],
    queryFn: () => stationServices.searchLocationByCity(`${searchCity}`),
    enabled: searchCity !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchCity(region), DELAY);
  };

  const addStation = async (payload: IStation) => {
    const res = await stationServices.addStation(payload);
    return res;
  };

  const {
    mutate: mutateAddStation,
    isPending: isPendingMutateAddStation,
    isSuccess: isSuccessMutateAddStation,
  } = useMutation({
    mutationFn: addStation,
    onError: (errors) => {
      setToaster({
        type: "error",
        message: errors.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add station",
      });
      reset();
    },
  });

  const handleAddStation = (data: IStationForm) => {
    const payload = {
      ...data,
      location: {
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      icon: data.icon,
    };
    mutateAddStation(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddStation,
    isPendingMutateAddStation,
    isSuccessMutateAddStation,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose,
    dataCategory,
    handleSearchRegion,
    dataRegion,
    searchCity,
    preview,
  };
};

export default useAddStationModal;
