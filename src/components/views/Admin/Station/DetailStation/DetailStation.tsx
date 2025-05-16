"use client";

import { Tab, Tabs } from "@nextui-org/react";
import useDetailStation from "./useDetailStation";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";
import LocationTab from "./LocationTab/LocationTab";

const DetailStation = () => {
  const {
    dataStation,
    handleUpdateStation,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingMutateUpdateStation,
    isSuccessMutateUpdateStation,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailStation();

  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataStation?.icon}
          onUpdateIcon={handleUpdateStation}
          isPendingUpdateIconStation={isPendingMutateUpdateStation}
          isSuccessUpdateIconStation={isSuccessMutateUpdateStation}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataStation={dataStation}
          onUpdateInfo={handleUpdateInfo}
          isPendingUpdateInfoStation={isPendingMutateUpdateStation}
          isSuccessUpdateInfoStation={isSuccessMutateUpdateStation}
        />
      </Tab>
      <Tab key="location" title="Location">
        <LocationTab
          dataStation={dataStation}
          dataDefaultRegion={dataDefaultRegion?.data.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          onUpdateLocation={handleUpdateLocation}
          isPendingUpdateLocationStation={isPendingMutateUpdateStation}
          isSuccessUpdateLocationStation={isSuccessMutateUpdateStation}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailStation;
