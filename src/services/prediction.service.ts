import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPredict } from "@/types/Predict";

const predictionServices = {
  addPrediction: (payload: IPredict) =>
    instance.post(endpoint.PREDICTION, payload),
};

export default predictionServices;