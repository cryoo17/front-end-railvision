import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const InfoTab = (props) => {
  const { dataCategory } = props;

  const { controlUpdateInfo, setValueUpdateInfo } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("description", `${dataCategory?.description}`);
  }, [dataCategory]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Kategori</h1>
        
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4">
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  isReadOnly
                  label="Nama Kategori"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  isReadOnly
                  label="Deskripsi"
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
