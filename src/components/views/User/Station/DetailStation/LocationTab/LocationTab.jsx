"use client";

import {
  Autocomplete,
  AutocompleteItem,
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

const LocationTab = (props) => {
  const {
    dataStation,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = props;
  const {
    controlUpdateLocation,
    setValueUpdateLocation,
    dataRegion,
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

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Lokasi Stasiun</h1>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
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
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    isReadOnly
                    defaultItems={
                      dataRegion?.data.data && searchCity !== ""
                        ? dataRegion.data.data
                        : []
                    }
                    defaultInputValue={dataDefaultRegion}
                    label="Lokasi"
                    variant="bordered"
                    labelPlacement="outside"
                  >
                    {(city) => (
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
                  isReadOnly
                  label="Latitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
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
                  isReadOnly
                  label="Longitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  
                />
              )}
            />
          </Skeleton>
          
        </form>
      </CardBody>
    </Card>
  );
};

export default LocationTab;
