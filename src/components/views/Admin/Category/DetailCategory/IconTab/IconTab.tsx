import InputFile from "@/components/ui/InputFile/InputFile";
import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
  currentIcon?: string;
  onUpdateIcon: (data: ICategory) => void;
  isPendingUpdateIconCategory: boolean;
  isSuccessUpdateIconCategory: boolean;
}

const IconTab = (props: PropTypes) => {
  const {
    currentIcon,
    onUpdateIcon,
    isPendingUpdateIconCategory,
    isSuccessUpdateIconCategory,
  } = props;
  const {
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    resetUpdateIcon,
    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdateIconCategory) {
      resetUpdateIcon();
    }
  }, [isSuccessUpdateIconCategory]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdateIcon)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon && currentIcon !== ""}
              className="aspect-square rounded-lg"
            >
              {currentIcon && currentIcon !== "" ? (
                <Image
                  src={currentIcon}
                  alt="icon"
                  fill
                  className="!relative"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-lg bg-default-200">
                  <p className="text-default-500">No Icon</p>
                </div>
              )}
            </Skeleton>
          </div>
          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteIcon(onChange)}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                isDeleting={isPendingMutateDeleteFile}
                isUploading={isPendingMutateUploadFile}
                isInvalid={errorsUpdateIcon.icon !== undefined}
                errorMessage={errorsUpdateIcon.icon?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Icon
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile ||
              isPendingUpdateIconCategory ||
              !preview
            }
          >
            {isPendingUpdateIconCategory ? (
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

export default IconTab;
