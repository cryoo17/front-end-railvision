"use client";

import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useDebounce from "./useDebounce";
import { ChangeEvent, useCallback } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan path saat ini (misalnya /admin/station)
  const searchParams = useSearchParams();
  const debounce = useDebounce();

  // Extract query parameters
  const currentLimit = searchParams.get("limit") || LIMIT_DEFAULT;
  const currentPage = searchParams.get("page") || PAGE_DEFAULT;
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";

  // Utility to create query string
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

  // Set default URL parameters
  const setUrl = useCallback(() => {
    const queryString = createQueryString({
      limit: currentLimit,
      page: currentPage,
      search: currentSearch,
    });
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  }, [
    router,
    pathname,
    createQueryString,
    currentLimit,
    currentPage,
    currentSearch,
  ]);

  const setUrlExplore = useCallback(() => {
    const queryString = createQueryString({
      limit: currentLimit,
      page: currentPage,
      category: currentCategory,
    });
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  }, [
    router,
    pathname,
    createQueryString,
    currentLimit,
    currentPage,
    currentCategory,
  ]);

  // Handle page change
  const handleChangePage = useCallback(
    (page: number) => {
      const queryString = createQueryString({ page });
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [router, pathname, createQueryString],
  );

  // Handle limit change
  const handleChangeLimit = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedLimit = e.target.value;
      const queryString = createQueryString({
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      });
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [router, pathname, createQueryString],
  );

  // Handle search input
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debounce(() => {
        const search = e.target.value;
        const queryString = createQueryString({
          search,
          page: PAGE_DEFAULT,
        });
        router.push(`${pathname}?${queryString}`, { scroll: false });
      }, DELAY);
    },
    [router, pathname, createQueryString, debounce],
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    const queryString = createQueryString({
      search: "",
      page: PAGE_DEFAULT,
    });
    router.push(`${pathname}?${queryString}`, { scroll: false });
  }, [router, pathname, createQueryString]);

  const handleChangeCategory = useCallback(
    (category: string) => {
      const queryString = createQueryString({ category });
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [router, pathname, createQueryString],
  );

  return {
    setUrl,
    setUrlExplore,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeCategory,
    currentLimit,
    currentPage,
    currentSearch,
    currentCategory,
  };
};

export default useChangeUrl;
