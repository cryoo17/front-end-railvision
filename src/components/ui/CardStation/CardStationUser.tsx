import { IStation } from "@/types/Station";
import { cn } from "@/utils/cn";
import { Card, CardBody, CardFooter, Chip, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface PropTypes {
  key?: string;
  station?: IStation;
  className?: string;
  isLoading?: boolean;
}

const UserCardStation = (props: PropTypes) => {
  const { key, station, className, isLoading } = props;
  return (
    <Card
      key={key}
      className={cn(className, "cursor-pointer")}
      shadow="sm"
      isPressable
      as={Link}
      href={`/user/station/${station?._id}`}
    >
      {!isLoading ? (
        <Fragment>
          <CardBody>
            <Image
              src={`${station?.icon}`}
              alt="cover"
              width={1920}
              height={1080}
              className="aspect-video w-full rounded-lg object-cover"
            />
          </CardBody>
          <CardFooter className="flex-col items-start pt-0 text-left">
            <h2 className="line-clamp-1 text-lg font-bold text-blue-700">
              {station?.name}
            </h2>
            <p className="mb-2 line-clamp-2">{station?.description}</p>
            {station?.category === "68234b3cd4829177e0c38a13" && (
              <Chip color="danger">Sangat Padat</Chip>
            )}
            {station?.category === "68234afcd4829177e0c38a06" && (
              <Chip color="warning">Cukup Padat</Chip>
            )}
            {station?.category === "68234abcd4829177e0c38a02" && (
              <Chip color="success">Tidak Padat</Chip>
            )}
            {/* <p className="text-foreground-500">{station?.category}</p> */}
          </CardFooter>
        </Fragment>
      ) : (
        <Fragment>
          <CardBody>
            <Skeleton className="aspect-video w-full rounded-lg bg-default-300" />
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-2">
            <Skeleton className="h-4 w-3/5 rounded-lg bg-default-200" />
            <Skeleton className="h-4 w-4/5 rounded-lg bg-default-200" />
            <Skeleton className="h-4 w-2/5 rounded-lg bg-default-200" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default UserCardStation;
