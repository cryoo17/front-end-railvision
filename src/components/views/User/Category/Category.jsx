"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useEffect } from "react";
import useCategory from "./useCategory";
import useChangeUrl from "@/hooks/useChangeUrl";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const query = Object.fromEntries(searchParams.entries()); 

  const { dataCategory, isLoadingCategory, isRefetchingCategory } =
    useCategory();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, [setUrl]);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <div className="lg:grid flex flex-col lg:grid-cols-3 gap-8">
          {dataCategory?.data?.map((category) => (
            <Card
              key={category._id}
              className="overflow-hidden rounded-lg shadow-lg flex justify-center items-center"
            >
              <CardHeader className="h-fit w-fit">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={250}
                  height={250}
                />
              </CardHeader>
              <CardBody className="p-4">
                <h2 className="text-xl font-bold">
                  {category.name}
                </h2>
                <p className="text-lg text-gray-600">
                  {category.description || "No description available"}
                </p>
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
