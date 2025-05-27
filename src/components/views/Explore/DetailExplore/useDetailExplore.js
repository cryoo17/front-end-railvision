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

  return {
    dataDetailStation,
    isLoadingDetailStation,
  };
};

export default useDetailExplore;
