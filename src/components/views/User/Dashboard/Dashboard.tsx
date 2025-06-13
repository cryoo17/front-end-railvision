"use client";

import { Controller } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Image,
  Spinner,
  CardFooter,
  Chip,
} from "@nextui-org/react";

import InputFile from "@/components/ui/InputFile/InputFile";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  const {
    control,
    errors,
    preview,
    predictionResult,
    handleSubmitForm,
    handleAddPrediction,
    handleUploadImage,
    handleDeleteImage,
    isPendingMutateAddPrediction,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useDashboard();

  const isSubmitting =
    isPendingMutateUploadFile || isPendingMutateAddPrediction;

  const getLabelColor = (label?: string): "success" | "warning" | "danger" => {
    switch (label) {
      case "TIDAK_PADAT":
        return "success";
      case "CUKUP_PADAT":
        return "warning";
      case "SANGAT_PADAT":
        return "danger";
      default:
        return "success";
    }
  };

  return (
    <section className="container mx-auto p-4">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        {/* Prediction Form Card */}
        <Card className="p-4">
          <CardHeader>
            <h1 className="text-xl font-bold">Crowd Prediction</h1>
          </CardHeader>
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
                    label="Station Name"
                    variant="bordered"
                    type="text"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    isDisabled={isSubmitting}
                  />
                )}
              />

              <Controller
                name="imageUrl"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isDeleting={isPendingMutateDeleteFile}
                    isUploading={isPendingMutateUploadFile}
                    isInvalid={!!errors.imageUrl}
                    errorMessage={errors.imageUrl?.message}
                    isDropable
                    preview={typeof value === "string" ? value : ""}
                  />
                )}
              />

              <Button
                type="submit"
                color="primary"
                className="w-fit"
                disabled={isSubmitting || !preview}
              >
                {isSubmitting ? <Spinner size="sm" color="white" /> : "Predict"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Prediction Result Card */}
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-xl font-bold">Result</h2>
          {predictionResult ? (
            <Card className="w-full max-w-md p-4">
              <CardHeader className="p-0">
                <Image
                  alt="Prediction result"
                  className="h-60 w-full rounded-xl object-cover"
                  src={typeof preview === "string" ? preview : ""}
                />
              </CardHeader>
              <CardBody>
                <h3 className="text-lg font-semibold">
                  {predictionResult.name}
                </h3>
              </CardBody>
              <CardFooter className="flex items-center gap-4">
                <p className="font-semibold">Prediction:</p>
                <Chip
                  color={getLabelColor(predictionResult.label)}
                  variant="flat"
                >
                  {predictionResult.label.replace("_", " ")}
                </Chip>
                {/* <p className="text-sm text-default-500">
                  Confidence: {(predictionResult.confidence * 100).toFixed(2)}%
                </p> */}
              </CardFooter>
            </Card>
          ) : (
            <Card className="flex h-60 w-full max-w-md items-center justify-center p-4">
              <p className="text-default-500">
                Submit an image to see the prediction result.
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
