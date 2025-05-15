import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IStation } from "@/types/Station";

const stationServices = {
  getStations: (params?: string) =>
    instance.get(`${endpoint.STATION}?${params}`),
  getStationById: (id: string) => instance.get(`${endpoint.STATION}/${id}`),
  addStation: (payload: IStation) =>
    instance.post(`${endpoint.STATION}`, payload),
  searchLocationByCity: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  getCityById: (id: string) => instance.get(`${endpoint.REGION}/${id}/regency`),
  updateStation: (id: string, payload: IStation) =>
    instance.put(`${endpoint.STATION}/${id}`, payload),
  deleteStation: (id: string) => instance.delete(`${endpoint.STATION}/${id}`),
};

export default stationServices;
