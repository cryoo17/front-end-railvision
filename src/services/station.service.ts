import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IStation } from "@/types/Station";

const stationServices = {
  getStations: (params?: string) =>
    instance.get(`${endpoint.STATION}?${params}`),
  // getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  addStation: (payload: IStation) =>
    instance.post(`${endpoint.STATION}`, payload),
  searchLocationByCity: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  // updateCategory: (id: string, payload: ICategory) =>
  //   instance.put(`${endpoint.CATEGORY}/${id}`, payload),
  deleteStation: (id: string) => instance.delete(`${endpoint.STATION}/${id}`),
};

export default stationServices;
