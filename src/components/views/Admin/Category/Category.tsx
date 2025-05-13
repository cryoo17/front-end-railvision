"use client";

import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; // Updated imports
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction/DropdownAction";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal/DeleteCategoryModal";
import DataTable from "@/components/ui/DataTable/DataTable";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Mengambil query parameters
  const query = Object.fromEntries(searchParams.entries()); // Konversi ke objek

  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, [setUrl]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <DropdownAction
              textButtonDetail="Detail Category"
              textButtonDelete="Delete Category"
              onPressButtonDetail={() =>
                router.push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [router, setSelectedId, deleteCategoryModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LISTS_CATEGORY}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}
      <AddCategoryModal
        {...addCategoryModal}
        refetchCategory={refetchCategory}
      />
      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default Category;
