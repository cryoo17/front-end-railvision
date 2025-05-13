"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation"; // Updated import
import { useState } from "react";

const useCategory = () => {
  const searchParams = useSearchParams(); // Mengambil query parameters
  const [selectedId, setSelectedId] = useState<string>("");

  // Mengambil limit, page, dan search dari useChangeUrl yang sudah disesuaikan
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCategories = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["Categories", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategories(),
    enabled: !!currentPage && !!currentLimit, // Tidak perlu router.isReady
  });

  return {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  };
};

export default useCategory;
