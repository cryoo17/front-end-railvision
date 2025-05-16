"use client";

import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import Image from "next/image";

const IconTab = (props) => {
  const { currentIcon} = props;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Station Image</h1>
        <p className="w-full text-small text-default-400">
          Image of this station
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Image
            </p>
            <Skeleton
              isLoaded={!!currentIcon && currentIcon !== ""}
              className="aspect-video rounded-lg"
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
                  <p className="text-default-500">No Image</p>
                </div>
              )}
            </Skeleton>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
