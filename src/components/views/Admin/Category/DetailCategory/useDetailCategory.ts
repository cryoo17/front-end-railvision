"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const useDetailCategory = () => {
  const params = useParams();
  const id = params.id as string;
  const { setToaster } = useContext(ToasterContext);

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["Category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(`${id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: updateCategory,
    onError: (errors) => {
      setToaster({
        type: "error",
        message: errors.message,
      });
    },
    onSuccess: () => {
      refetchCategory();
      setToaster({
        type: "success",
        message: "Success update category",
      });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  return {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  };
};

export default useDetailCategory;
