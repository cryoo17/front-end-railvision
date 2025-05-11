import InputFile from "@/components/ui/InputFile/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import Image from "next/image";

interface PropTypes {
  currentIcon?: string;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon } = props;
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
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
          <InputFile
            name=""
            isDropable
            label={
              <p className="mb-2 text-sm font-medium text-default-700">
                Upload New Icon
              </p>
            }
          />
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
