"use client";

import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useDetailCategory = () => {
  const params = useParams();
  const id = params.id as string;

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });

  return {
    dataCategory,
  };
};

export default useDetailCategory;
