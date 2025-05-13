"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Key, ReactNode, useCallback, useEffect } from "react";
import Image from "next/image";
import { Chip, useDisclosure } from "@nextui-org/react";
import useStation from "./useStation";
import DropdownAction from "@/components/commons/DropdownAction/DropdownAction";
import DataTable from "@/components/ui/DataTable/DataTable";
import { COLUMN_LISTS_STATION } from "./Station.constants";
import AddStationModal from "./AddStationModal/AddStationModal";
import DeleteStationModal from "./DeleteStationModal/DeleteStationModal";

const Station = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const {
    dataStation,
    isLoadingStation,
    isRefetchingStation,
    refetchStation,
    selectedId,
    setSelectedId,
  } = useStation();

  const addStationModal = useDisclosure();
  const deleteStationModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, [setUrl]);

  const renderCell = useCallback(
    (station: Record<string, unknown>, columnKey: Key) => {
      const cellValue = station[columnKey as keyof typeof station];

      switch (columnKey) {
        case "icon":
          return (
            <Image
              src={`${cellValue}`}
              alt="icon"
              width={100}
              height={200}
              className="aspect-video w-36 object-cover"
            />
          );
        case "category":
          const categoryMap: Record<
            string,
            { color: "danger" | "warning" | "success"; label: string }
          > = {
            "68234b3cd4829177e0c38a13": {
              color: "danger",
              label: "Sangat Padat",
            },
            "68234afcd4829177e0c38a06": {
              color: "warning",
              label: "Cukup Padat",
            },
            "68234abcd4829177e0c38a02": {
              color: "success",
              label: "Tidak Padat",
            },
          };

          const value = typeof cellValue === "string" ? cellValue : "";
          const { color, label } = categoryMap[value] || {
            color: "default",
            label: value || "Unknown",
          };

          return (
            <Chip color={color} size="sm" variant="flat">
              {label}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              textButtonDetail="Detail Station"
              textButtonDelete="Delete Station"
              onPressButtonDetail={() =>
                router.push(`/admin/station/${station._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${station._id}`);
                deleteStationModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [router, setSelectedId, deleteStationModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Station"
          columns={COLUMN_LISTS_STATION}
          data={dataStation?.data || []}
          emptyContent="Station is empty"
          isLoading={isLoadingStation || isRefetchingStation}
          onClickButtonTopContent={addStationModal.onOpen}
          renderCell={renderCell}
          totalPages={dataStation?.pagination.totalPages}
        />
      )}
      <AddStationModal {...addStationModal} refetchStation={refetchStation} />
      <DeleteStationModal
        {...deleteStationModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchStation={refetchStation}
      />
    </section>
  );
};

export default Station;
