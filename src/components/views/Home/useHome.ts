import {
  LIMIT_CATEGORY,
  LIMIT_STATION,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import categoryServices from "@/services/category.service";
import stationServices from "@/services/station.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getCategories = async () => {
    const params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });

  const getStations = async (params: string) => {
    const res = await stationServices.getStations(params);
    const { data } = res;
    return data;
  };

  const currentStationQuery = `limit=${LIMIT_STATION}&page=${PAGE_DEFAULT}`;

  const { data: dataStation, isLoading: isLoadingStation } = useQuery({
    queryKey: ["Stations"],
    queryFn: () => getStations(currentStationQuery),
  });

  return {
    dataStation,
    isLoadingStation,
    dataCategory,
    isLoadingCategory,
  };
};

export default useHome;
