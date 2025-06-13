// interface IPredict {
//   // _id?: string;
//   name?: string;
//   icon?: string | FileList;
// }

interface IPredictPayload {
  name: string;
  imageUrl: string;
}

interface IPredictionResult {
  name: string;
  label: "SANGAT_PADAT" | "CUKUP_PADAT" | "TIDAK_PADAT"; 
  confidence?: number;
}

interface IPredictionForm {
  name?: string;
  imageUrl?: string | FileList;
}

export type { IPredictPayload, IPredictionResult, IPredictionForm };
