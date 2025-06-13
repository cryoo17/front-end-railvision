import { IPredictPayload } from "@/types/Predict";
import endpoint from "./endpoint.constant";
import instanceLocal from "@/libs/axios/instanceLocal";

const predictionServices = {
  addPrediction: (payload: IPredictPayload) =>
    instanceLocal.post(endpoint.PREDICTION, payload),
};

export default predictionServices;