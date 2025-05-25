import { ICategory } from "@/types/Category";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  category: ICategory[];
  isLoadingCategory: boolean;
}

const HomeCategory = (props: PropTypes) => {
  const { category, isLoadingCategory } = props;
  return (
    <Card className="mx-6 mb-8 p-8 lg:mx-0 h-fit w-2/3">
      <CardHeader className="p-0">
        <h1 className="text-2xl font-bold text-blue-700">
          Kategori Stasiun
        </h1>
      </CardHeader>
      <CardBody className="mt-4 p-0">
        <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-3">
          {!isLoadingCategory && category
            ? category.map((item) => (
                <Link
                  key={`category-${item._id}`}
                  href={`/station?category=${item._id}`}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4"
                >
                  <Image
                    src={`${item.icon}`}
                    alt={`${item.name}`}
                    width={100}
                    height={100}
                    className="1/2"
                  />
                  <p className="text-md font-bold">{item.name}</p>
                </Link>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={`list-category-skeleton-${i}`}
                  className="aspect-square rounded-xl"
                />
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeCategory;
