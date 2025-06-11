"use client";

import { Tab, Tabs } from "@nextui-org/react";
import useDetailStation from "./useDetailStation";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";
import LocationTab from "./LocationTab/LocationTab";

const DetailStation = () => {
  const { dataStation, dataDefaultRegion, isPendingDefaultRegion } =
    useDetailStation();

  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Gambar">
        <IconTab currentIcon={dataStation?.icon} />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab dataStation={dataStation} />
      </Tab>
      <Tab key="location" title="Lokasi">
        <LocationTab
          dataStation={dataStation}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailStation;
