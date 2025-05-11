"use client";

import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";

const useCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounce = useDebounce();
  const [selectedId, setSelectedId] = useState<string>("");
  const currentLimit = searchParams.get("limit") || LIMIT_DEFAULT;
  const currentPage = searchParams.get("page") || PAGE_DEFAULT;
  const currentSearch = searchParams.get("search") || "";

  const createQueryString = useCallback(
    (params: { [key: string]: string | number }) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, String(value));
      });
      return newParams.toString();
    },
    [searchParams],
  );

  const setURL = useCallback(() => {
    const queryString = createQueryString({
      limit: currentLimit,
      page: currentPage,
      search: currentSearch,
    });
    router.replace(`/admin/category?${queryString}`, { scroll: false });
  }, [router, createQueryString, currentLimit, currentPage, currentSearch]);

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
    queryKey: ["Category", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategories(),
    enabled: !!currentPage && !!currentLimit,
  });

  const handleChangePage = useCallback(
    (page: number) => {
      const queryString = createQueryString({ page });
      router.push(`/admin/category?${queryString}`, { scroll: false });
    },
    [router, createQueryString],
  );

  const handleChangeLimit = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedLimit = e.target.value;
      const queryString = createQueryString({
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      });
      router.push(`/admin/category?${queryString}`, { scroll: false });
    },
    [router, createQueryString],
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debounce(() => {
        const search = e.target.value;
        const queryString = createQueryString({
          search,
          page: PAGE_DEFAULT,
        });
        router.push(`/admin/category?${queryString}`, { scroll: false });
      }, DELAY);
    },
    [router, createQueryString, debounce],
  );

  const handleClearSearch = useCallback(() => {
    const queryString = createQueryString({
      search: "",
      page: PAGE_DEFAULT,
    });
    router.push(`/admin/category?${queryString}`, { scroll: false });
  }, [router, createQueryString]);

  return {
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
    currentSearch,
    selectedId,
    setSelectedId,
  };
};

export default useCategory;
