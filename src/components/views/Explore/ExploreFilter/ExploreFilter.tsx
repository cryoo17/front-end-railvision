import { Controller } from "react-hook-form";
import { Autocomplete, AutocompleteItem, Skeleton } from "@nextui-org/react";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import useExploreFilter from "./useExploreFilter";

const ExploreFilter = () => {
  const { control, setValue, dataCategory, isSuccessGetCategory } =
    useExploreFilter();
  const { handleChangeCategory, currentCategory } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
    }
  }, [isSuccessGetCategory]);

  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessGetCategory ? (
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Autocomplete
                {...field}
                defaultSelectedKey={`${currentCategory}`}
                defaultItems={dataCategory?.data.data || []}
                label="Category"
                variant="bordered"
                labelPlacement="outside"
                onSelectionChange={(value) => {
                  onChange(value);
                  handleChangeCategory(value !== null ? `${value}` : "");
                }}
                placeholder="Search category here"
              >
                {(category: ICategory) => (
                  <AutocompleteItem key={`${category._id}`}>
                    {category.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreFilter;
