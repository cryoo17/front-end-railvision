import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const stationServices = {
  getStations: (params?: string) =>
    instance.get(`${endpoint.STATION}?${params}`),
  // getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  // addCategory: (payload: ICategory) =>
  //   instance.post(endpoint.CATEGORY, payload),
  // updateCategory: (id: string, payload: ICategory) =>
  //   instance.put(`${endpoint.CATEGORY}/${id}`, payload),
  // deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
};

export default stationServices;
