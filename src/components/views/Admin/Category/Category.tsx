"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import DataTable from "@/components/ui/DataTable/DataTable";
import { useRouter, useSearchParams } from "next/navigation";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile/InputFile";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const {
    setURL,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    currentPage,
    currentLimit,
  } = useCategory();

  const addCategoryModal = useDisclosure();

  useEffect(() => {
    setURL();
  }, [setURL]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={"detail-category-button"}
                  onPress={() => router.push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key={"delete-category-button"}
                  className="text-danger-500"
                >
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [router],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LISTS_CATEGORY}
          currentPage={Number(currentPage)}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}

      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
    </section>
  );
};

export default Category;
