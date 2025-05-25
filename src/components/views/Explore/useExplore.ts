"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import stationServices from "@/services/station.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useExplore = () => {
  const searchParams = useSearchParams();
  const { currentLimit, currentPage, currentCategory } = useChangeUrl();

  const getStations = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}`;
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
    queryKey: ["Stations", currentPage, currentLimit, currentCategory],
    queryFn: () => getStations(),
    // enabled: !!searchParams.get("page") && !!currentPage && !!currentLimit,
  });

  return {
    dataStation,
    isLoadingStation,
    isRefetchingStation,
    refetchStation,
  };
};

export default useExplore;
