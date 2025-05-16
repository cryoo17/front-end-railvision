"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import useStation from "./useStation";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { LIMIT_LISTS } from "@/constants/list.constants";

const Station = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const {
    dataStation,
    isLoadingStation,
    isRefetchingStation,
    currentLimit,
    handleChangeLimit,
  } = useStation();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, [setUrl]);

  return (
    <>
      <Select
        className="mb-4 hidden max-w-36 lg:block"
        size="md"
        selectedKeys={[`${currentLimit}`]}
        selectionMode="single"
        onChange={handleChangeLimit}
        startContent={<p className="text-small">Show:</p>}
        disallowEmptySelection
      >
        {LIMIT_LISTS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
      <section>
        {Object.keys(query).length > 0 && (
          <div className="grid grid-cols-3 gap-8">
            {dataStation?.data?.map((station) => (
              <Card
                key={station._id}
                className="flex items-center justify-center overflow-hidden rounded-lg shadow-lg"
              >
                <CardHeader className="h-fit w-full">
                  <Image src={station.icon} alt={station.name} />
                </CardHeader>
                <CardBody className="p-4">
                  <h2 className="text-xl font-bold">{station.name}</h2>
                  <p className="text-lg text-gray-600">
                    {station.description || "No description available"}
                  </p>
                  {station.category === "68234b3cd4829177e0c38a13" && (
                    <Chip color="danger">Sangat Padat</Chip>
                  )}
                  {station.category === "68234afcd4829177e0c38a06" && (
                    <Chip color="warning">Cukup Padat</Chip>
                  )}
                  {station.category === "68234abcd4829177e0c38a02" && (
                    <Chip color="success">Tidak Padat</Chip>
                  )}
                  <button
                    className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
                    onClick={() => router.push(`/user/station/${station._id}`)}
                  >
                    View Details
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        {(isLoadingStation || isRefetchingStation) && (
          <p className="text-center text-gray-500">Loading categories...</p>
        )}
        {dataStation?.data?.length === 0 && (
          <p className="text-center text-gray-500">Station is empty</p>
        )}
      </section>
    </>
  );
};

export default Station;
