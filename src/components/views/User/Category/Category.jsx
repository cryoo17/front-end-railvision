"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; // Updated imports
import { useEffect } from "react";
// import { COLUMN_LISTS_CATEGORY } from "../../Admin/Category/Category.constants";
import useCategory from "./useCategory";
import useChangeUrl from "@/hooks/useChangeUrl";
// import DropdownActionUser from "@/components/commons/DropdownAction/DropdownActionUser";
// import DataTableUser from "@/components/ui/DataTable/DataTableUser";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Mengambil query parameters
  const query = Object.fromEntries(searchParams.entries()); // Konversi ke objek

  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
  } = useCategory();

  // const addCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, [setUrl]);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {dataCategory?.data?.map((category) => (
            <Card key={category._id} className="overflow-hidden rounded-lg shadow-lg">
              <CardHeader className="relative w-full h-48">
                <Image
                  src={category.icon}
                  alt={category.name}
                  layout="fill"
                />
              </CardHeader>
              <CardBody className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{category.name}</h2>
                <p className="text-sm text-gray-600">{category.description || "No description available"}</p>
                <button
                  className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
                  onClick={() => router.push(`/user/category/${category._id}`)}
                >
                  View Details
                </button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      {(isLoadingCategory || isRefetchingCategory) && (
        <p className="text-center text-gray-500">Loading categories...</p>
      )}
      {dataCategory?.data?.length === 0 && (
        <p className="text-center text-gray-500">Category is empty</p>
      )}
    </section>
  );
};

export default Category;
