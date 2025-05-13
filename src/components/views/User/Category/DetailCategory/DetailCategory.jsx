"use client";

import { Tab, Tabs } from "@nextui-org/react";
import useDetailCategory from "./useDetailCategory";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";

const DetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();

  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdateIcon={handleUpdateCategory}
          isPendingUpdateIconCategory={isPendingMutateUpdateCategory}
          isSuccessUpdateIconCategory={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdateInfo={handleUpdateCategory}
          isPendingUpdateInfoCategory={isPendingMutateUpdateCategory}
          isSuccessUpdateInfoCategory={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
