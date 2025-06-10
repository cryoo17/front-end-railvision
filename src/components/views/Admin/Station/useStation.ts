"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import stationServices from "@/services/station.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useStation = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getStations = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await stationServices.getStations(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataStation,
    isLoading: isLoadingStation,
    isRefetching: isRefetchingStation,
    refetch: refetchStation,
  } = useQuery({
    queryKey: ["Stations", currentPage, currentLimit, currentSearch],
    queryFn: () => getStations(),
    enabled: !!currentPage && !!currentLimit,
  });

  return {
    dataStation,
    isLoadingStation,
    isRefetchingStation,
    refetchStation,
    selectedId,
    setSelectedId,
  };
};

export default useStation;
