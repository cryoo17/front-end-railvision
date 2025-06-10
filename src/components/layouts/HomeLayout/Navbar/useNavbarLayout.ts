"use client";

import { DELAY, LIMIT_STATION, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import stationServices from "@/services/station.service";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

const useNavbarLayout = () => {
  const [search, setSearch] = useState("");
  const debounce = useDebounce();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });

  const getStations = async () => {
    const params = `search=${search}&limit=${LIMIT_STATION}&page=${PAGE_DEFAULT}&isPublish=true`;
    const res = await stationServices.getStations(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataStationSearch,
    isLoading: isLoadingStationSearch,
    isRefetching: isRefetchingStationSearch,
  } = useQuery({
    queryKey: ["StationSearch", search],
    queryFn: getStations,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,
    dataStationSearch,
    isLoadingStationSearch,
    isRefetchingStationSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useNavbarLayout;
