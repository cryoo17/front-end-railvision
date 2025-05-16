"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useLocationTab from "./useLocationTab";
import { ICity, IStationForm } from "@/types/Station";

interface PropTypes {
  dataStation: IStationForm;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdateLocation: (data: IStationForm) => void;
  isPendingUpdateLocationStation: boolean;
  isSuccessUpdateLocationStation: boolean;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataStation,
    dataDefaultRegion,
    isPendingDefaultRegion,
    onUpdateLocation,
    isPendingUpdateLocationStation,
    isSuccessUpdateLocationStation,
  } = props;
  const {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
    dataRegion,
    handleSearchRegion,
    searchCity,
  } = useLocationTab();

  useEffect(() => {
    if (dataStation) {
      setValueUpdateLocation("region", `${dataStation?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataStation?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataStation?.location?.coordinates[1]}`,
      );
    }
  }, [dataStation]);

  useEffect(() => {
    if (isSuccessUpdateLocationStation) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdateLocationStation]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Station Location</h1>
        <p className="w-full text-small text-default-400">
          Manage location of this station
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdateLocation)}
        >
          <Skeleton
            isLoaded={
              !!dataStation?.location?.region && !isPendingDefaultRegion
            }
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={
                      dataRegion?.data.data && searchCity !== ""
                        ? dataRegion.data.data
                        : []
                    }
                    defaultInputValue={dataDefaultRegion}
                    label="Location"
                    variant="bordered"
                    labelPlacement="outside"
                    onInputChange={(search) => handleSearchRegion(search)}
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
                    onSelectionChange={(value) => onChange(value)}
                    placeholder="Search location here"
                  >
                    {(city: ICity) => (
                      <AutocompleteItem key={`${city.id}`}>
                        {city.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            ) : (
              <Spinner size="lg" color="primary" />
            )}
          </Skeleton>
          <Skeleton
            isLoaded={!!dataStation?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataStation?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Longitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdateLocationStation || !dataStation?._id}
          >
            {isPendingUpdateLocationStation ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LocationTab;
