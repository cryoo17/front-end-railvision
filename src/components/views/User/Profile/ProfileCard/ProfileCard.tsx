"use client";

import {
  Avatar,
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
import { IProfile } from "@/types/Auth";
import useInfo from "./useInfo";
import usePicture from "./usePicture";
import InputFile from "@/components/ui/InputFile/InputFile";

interface PropTypes {
  currentPicture: string;
  onUpdatePicture: (data: IProfile) => void;
  isPendingUpdatePicture: boolean;
  isSuccessUpdatePicture: boolean;

  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ProfileCard = (props: PropTypes) => {
  const {
    currentPicture,
    onUpdatePicture,
    isPendingUpdatePicture,
    isSuccessUpdatePicture,
    dataProfile,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;

  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePicture();

  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfo();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">User Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this account
        </p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <section className="md:col-span-1">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmitUpdatePicture(onUpdatePicture)}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="self-start text-sm font-medium text-default-700">
                  Current Picture
                </p>
                <Skeleton
                  isLoaded={!!currentPicture}
                  className="h-40 w-40 rounded-full"
                >
                  <Avatar
                    src={currentPicture}
                    alt="Picture"
                    showFallback
                    className="h-40 w-40 text-large"
                  />
                </Skeleton>
              </div>
              <Controller
                name="profilePicture"
                control={controlUpdatePicture}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeletePicture(onChange)}
                    onUpload={(files) => handleUploadPicture(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                    errorMessage={errorsUpdatePicture.profilePicture?.message}
                    isDropable
                    label={
                      <p className="mb-2 text-sm font-medium text-default-700">
                        Upload New Picture
                      </p>
                    }
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
              <Button
                type="submit"
                color="primary"
                className="disabled:bg-default-500"
                disabled={
                  isPendingMutateUploadFile || isPendingUpdate || !preview
                }
              >
                {isPendingUpdate ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </section>
          <section className="md:col-span-2">
            <form
              className="flex h-full flex-col"
              onSubmit={handleSubmitUpdateInfo(onUpdate)}
            >
              <div className="flex flex-col gap-4">
                <Skeleton
                  isLoaded={!!dataProfile?.username}
                  className="rounded-lg"
                >
                  <Input
                    label="Username"
                    labelPlacement="outside"
                    variant="flat"
                    disabled
                    value={dataProfile?.username}
                  />
                </Skeleton>
                <Skeleton
                  isLoaded={!!dataProfile?.email}
                  className="rounded-lg"
                >
                  <Input
                    label="Email"
                    labelPlacement="outside"
                    variant="flat"
                    disabled
                    value={dataProfile?.email}
                  />
                </Skeleton>
                <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
                  <Input
                    label="Role"
                    labelPlacement="outside"
                    variant="flat"
                    disabled
                    value={dataProfile?.role}
                  />
                </Skeleton>
                <Skeleton
                  isLoaded={!!dataProfile?.fullName}
                  className="rounded-lg"
                >
                  <Controller
                    name="fullName"
                    control={controlUpdateInfo}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Fullname"
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Input your fullname"
                        isInvalid={errorsUpdateInfo.fullName !== undefined}
                        errorMessage={errorsUpdateInfo.fullName?.message}
                      />
                    )}
                  />
                </Skeleton>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  color="primary"
                  className="disabled:bg-default-500"
                  type="submit"
                  disabled={isPendingUpdate || !dataProfile?._id}
                >
                  {isPendingUpdate ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </section>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
