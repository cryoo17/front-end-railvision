interface ICity {
  id: string;
  name: string;
}

interface IStation {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  description?: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  icon?: string | FileList;
}

interface IStationForm extends IStation {
  region?: string;
  latitude?: string;
  longitude?: string;
}

export type { ICity, IStation, IStationForm };
