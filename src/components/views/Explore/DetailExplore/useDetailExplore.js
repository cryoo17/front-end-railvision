"use client";

import stationServices from "@/services/station.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useDetailExplore = () => {
  const params = useParams();
  const slug = params.slug;
  const getStationExploreBySlug = async () => {
    if (!slug) {
      throw new Error("Slug is required to fetch station details");
    }
    const { data } = await stationServices.getStationBySlug(slug);
    return data.data;
  };

  const { data: dataDetailStation, isLoading: isLoadingDetailStation } =
    useQuery({
      queryKey: ["detailStation", slug],
      queryFn: getStationExploreBySlug,
      enabled: !!slug,
    });

  const getCityById = async () => {
    if (!dataDetailStation?.location.region) {
      return null;
    }
    const { data } = await stationServices.getCityById(
      dataDetailStation.location.region,
    );
    return data.data[0];
  };

  const { data: dataRegion, isLoading: isLoadingRegion } = useQuery({
    queryKey: ["region", dataDetailStation?.location.region],
    queryFn: getCityById,
    enabled: !!dataDetailStation?.location.region,
    staleTime: Infinity,
  });

  const regionName = dataRegion?.name || "Unknown Region";

  return {
    dataDetailStation: dataDetailStation
      ? {
          ...dataDetailStation,
          location: {
            ...dataDetailStation.location,
            regionName,
          },
        }
      : null,
    isLoadingDetailStation,
    isLoadingRegion,
  };
};

export default useDetailExplore;
