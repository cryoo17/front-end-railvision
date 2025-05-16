"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import stationServices from "@/services/station.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useStation = () => {
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState("");
  const { currentLimit, currentPage, currentSearch, handleChangeLimit } = useChangeUrl();

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
    currentLimit,
    handleChangeLimit,
  };
};

export default useStation;
