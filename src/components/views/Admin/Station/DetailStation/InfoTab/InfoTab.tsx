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
  Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { IStationForm } from "@/types/Station";

interface PropTypes {
  dataStation: IStationForm;
  onUpdateInfo: (data: IStationForm) => void;
  isPendingUpdateInfoStation: boolean;
  isSuccessUpdateInfoStation: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataStation,
    onUpdateInfo,
    isPendingUpdateInfoStation,
    isSuccessUpdateInfoStation,
  } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
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

  useEffect(() => {
    if (isSuccessUpdateInfoStation) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdateInfoStation]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Station Information</h1>
        <p className="w-full text-small text-default-400">
          Manage Information of this station
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdateInfo)}
        >
          <Skeleton isLoaded={!!dataStation?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
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
                  label="Slug"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataStation?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  variant="bordered"
                  labelPlacement="outside"
                  defaultSelectedKey={dataStation.category}
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search category here"
                >
                  {(category: ICategory) => (
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
                  label="Description"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdateInfoStation || !dataStation?._id}
          >
            {isPendingUpdateInfoStation ? (
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

export default InfoTab;
