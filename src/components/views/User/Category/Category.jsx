"use client";

import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; // Updated imports
import { useCallback, useEffect } from "react";
import { COLUMN_LISTS_CATEGORY } from "../../Admin/Category/Category.constants";
import useCategory from "./useCategory";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownActionUser from "@/components/commons/DropdownAction/DropdownActionUser";
import DataTableUser from "@/components/ui/DataTable/DataTableUser";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Mengambil query parameters
  const query = Object.fromEntries(searchParams.entries()); // Konversi ke objek

  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    // refetchCategory,
    // selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, [setUrl]);

  const renderCell = useCallback(
    (category, columnKey) => {
      const cellValue = category[columnKey];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <DropdownActionUser
              textButtonDetail="Detail Category"
              onPressButtonDetail={() =>
                router.push(`/user/category/${category._id}`)
              }
            />
          );
        default:
          return cellValue;
      }
    },
    [router, setSelectedId, deleteCategoryModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTableUser
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LISTS_CATEGORY}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination?.totalPages}
        />
      )}
    </section>
  );
};

export default Category;
