"use client";

import { Tab, Tabs } from "@nextui-org/react";
import useDetailCategory from "./useDetailCategory";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";

const DetailCategory = () => {
  const { dataCategory } = useDetailCategory();
  return (
    <Tabs aria-label="Options">
      <Tab key={"icon"} title="Icon">
        <IconTab currentIcon={dataCategory?.icon} />
      </Tab>
      <Tab key={"info"} title="Info">
        <InfoTab dataCategory={dataCategory} />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
