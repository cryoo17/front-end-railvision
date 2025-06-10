"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Tabs,
  Tab,
  Chip,
} from "@nextui-org/react";
import useDetailExplore from "./useDetailExplore";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";

const DetailExplore = () => {
  const { dataDetailStation } = useDetailExplore();
  return (
    <div className="px-8 py-24">
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/station">Station</BreadcrumbItem>
        <BreadcrumbItem>{dataDetailStation?.name}</BreadcrumbItem>
      </Breadcrumbs>

      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <h1 className="mb-4 text-2xl font-semibold text-primary-700">
            {dataDetailStation?.name}
          </h1>
          <div className="mb-4 flex items-center gap-2 text-foreground-500">
            <FaLocationDot width={16} />
            <p>{dataDetailStation?.location?.regionName}</p>
          </div>
          <div className="">
            <Image
              src={dataDetailStation?.icon}
              alt={dataDetailStation?.name}
              width={1920}
              height={1080}
            />
          </div>
        </div>
        <div>
          <Tabs fullWidth>
            <Tab key="Status" title="Status">
              {dataDetailStation?.category === "68234b3cd4829177e0c38a13" && (
                <Chip color="danger">Sangat Padat</Chip>
              )}
              {dataDetailStation?.category === "68234afcd4829177e0c38a06" && (
                <Chip color="warning">Cukup Padat</Chip>
              )}
              {dataDetailStation?.category === "68234abcd4829177e0c38a02" && (
                <Chip color="success">Tidak Padat</Chip>
              )}
            </Tab>
            <Tab key="Description" title="Description">
              <h2>{dataDetailStation?.description}</h2>
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default DetailExplore;
