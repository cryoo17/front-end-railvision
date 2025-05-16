"use client";

import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import stationServices from "@/services/station.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Please input latitude"),
  longitude: yup.string().required("Please input longitude"),
});

const useLocationTab = () => {
  const debounce = useDebounce();
  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
  });

  const [searchCity, setSearchCity] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchCity],
    queryFn: () => stationServices.searchLocationByCity(`${searchCity}`),
    enabled: searchCity !== "",
  });

  const handleSearchRegion = (region) => {
    debounce(() => setSearchCity(region), DELAY);
  };

  return {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
    dataRegion,
    handleSearchRegion,
    searchCity,
  };
};

export default useLocationTab;
