"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

const InfoTab = (props) => {
  const { dataStation } = props;
  const {
    controlUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    if (dataStation) {
      setValueUpdateInfo("name", `${dataStation?.name}`);
      setValueUpdateInfo("slug", `${dataStation?.slug}`);
      setValueUpdateInfo("category", `${dataStation?.category}`);
      setValueUpdateInfo("description", `${dataStation?.description}`);
    }
  }, [dataStation]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Station Information</h1>
        <p className="w-full text-small text-default-400">
          Manage Information of this station
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4">
          <Skeleton isLoaded={!!dataStation?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  isReadOnly
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataStation?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  isReadOnly
                  label="Slug"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataStation?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  isReadOnly
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  variant="bordered"
                  labelPlacement="outside"
                  defaultSelectedKey={dataStation.category}
                >
                  {(category) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataStation?.description}
            className="rounded-lg"
          >
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  isReadOnly
                  label="Description"
                  variant="bordered"
                  labelPlacement="outside"
                />
              )}
            />
          </Skeleton>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
