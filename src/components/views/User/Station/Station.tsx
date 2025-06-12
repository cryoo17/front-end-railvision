"use client";

import useStation from "./useStation";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { IStation } from "@/types/Station";
import ExploreFooter from "../../Explore/ExploreFooter/ExploreFooter";
import { ImFilesEmpty } from "react-icons/im";
import UserCardStation from "@/components/ui/CardStation/CardStationUser";

const Station = () => {
  const { setUrlExplore } = useChangeUrl();
  const { dataStation, isLoadingStation, isRefetchingStation } = useStation();

  useEffect(() => {
    setUrlExplore();
  }, [setUrlExplore]);

  return (
    <div className="mb-8 mt-24 flex w-full flex-col justify-center gap-6 px-6 lg:flex-row">
      {/* <ExploreFilter /> */}
      <div className="min-h-[70vh] w-full flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingStation && !isRefetchingStation
            ? dataStation?.data?.map((item: IStation) => (
                <UserCardStation
                  key={`card-station-${item._id}`}
                  station={item}
                />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <UserCardStation
                  key={`card-station-loading-${index}`}
                  isLoading={isLoadingStation}
                />
              ))}
        </div>

        {!isLoadingStation && dataStation?.data?.length > 0 && (
          <ExploreFooter totalPages={dataStation?.pagination?.totalPages} />
        )}

        {dataStation?.data?.length < 1 &&
          !isLoadingStation &&
          !isRefetchingStation && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <ImFilesEmpty />
              <h2 className="text-center text-2xl font-bold text-blue-700">
                Station is empty
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default Station;
