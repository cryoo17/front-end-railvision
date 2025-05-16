"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import stationServices from "@/services/station.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const useDetailStation = () => {
  const { id } = useParams();
  const { setToaster } = useContext(ToasterContext);

  const getStationById = async (stationId) => {
    const { data } = await stationServices.getStationById(stationId);
    return data.data;
  };

  const { data: dataStation, refetch: refetchStation } = useQuery({
    queryKey: ["Station", id],
    queryFn: () => getStationById(id),
  });

  const updateStation = async (payload) => {
    const { data } = await stationServices.updateStation(id, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateStation,
    isPending: isPendingMutateUpdateStation,
    isSuccess: isSuccessMutateUpdateStation,
  } = useMutation({
    mutationFn: updateStation,
    onError: (errors) => {
      setToaster({
        type: "error",
        message: errors.message,
      });
    },
    onSuccess: () => {
      refetchStation();
      setToaster({
        type: "success",
        message: "Success update station",
      });
    },
  });

  const handleUpdateStation = (data) => mutateUpdateStation(data);
  const handleUpdateInfo = (data) => mutateUpdateStation(data);

  const handleUpdateLocation = (data) => {
    const payload = {
      location: {
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };
    mutateUpdateStation(payload);
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion", dataStation?.location?.region],
      queryFn: () => stationServices.getCityById(dataStation?.location?.region),
      enabled: !!dataStation?.location?.region,
    });

  return {
    dataStation,
    handleUpdateStation,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingMutateUpdateStation,
    isSuccessMutateUpdateStation,
    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailStation;
