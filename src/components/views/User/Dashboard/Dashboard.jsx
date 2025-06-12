"use client";

import InputFile from "@/components/ui/InputFile/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Image,
} from "@nextui-org/react";
import useDashboard from "./useDashboard";
import { Controller } from "react-hook-form";

const Dashboard = () => {
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddPrediction,
    isPendingMutateAddPrediction,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    preview,
  } = useDashboard();

  return (
    <section className="container mx-auto p-4">
      <Card className="mb-8 p-4">
        <CardBody>
          <form
            onSubmit={handleSubmitForm(handleAddPrediction)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nama Stasiun"
                  variant="bordered"
                  type="text"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="icon"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteIcon(onChange)}
                  onUpload={(files) => handleUploadIcon(files, onChange)}
                  isDeleting={isPendingMutateDeleteFile}
                  isUploading={isPendingMutateUploadFile}
                  isInvalid={errors.icon !== undefined}
                  errorMessage={errors.icon?.message}
                  isDropable
                  preview={typeof preview === "string" ? preview : ""}
                />
              )}
            />

            <Button
              type="submit"
              color="primary"
              className="w-fit disabled:bg-default-500"
              disabled={
                isPendingMutateUploadFile ||
                isPendingMutateAddPrediction ||
                !preview
              }
            >
              {isPendingMutateAddPrediction ? (
                <spinner size="sm" color="white" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>

      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-xl font-bold">Hasil</h2>
        <Card className="w-full max-w-2xl">
          <CardHeader className="flex-col px-4 pb-0 pt-4">
            {preview ? (
              <Image
                alt="Prediction preview"
                className="h-48 rounded-xl object-cover"
                src={preview}
                width="100%"
              />
            ) : (
              <Image
                alt="Sample prediction"
                className="h-48 rounded-xl object-cover"
                // src={icon}
                width="100%"
              />
            )}
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
