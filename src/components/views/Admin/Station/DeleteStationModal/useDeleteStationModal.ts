import { ToasterContext } from "@/contexts/ToasterContext";
import stationServices from "@/services/station.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteStationModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteStation = async (id: string) => {
    const res = await stationServices.deleteStation(id);
    return res;
  };

  const {
    mutate: mutateDeleteStation,
    isPending: isPendingMutateDeleteStation,
    isSuccess: isSuccessMutateDeleteStation,
  } = useMutation({
    mutationFn: deleteStation,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Station Success",
      });
    },
  });

  return {
    mutateDeleteStation,
    isPendingMutateDeleteStation,
    isSuccessMutateDeleteStation,
  };
};

export default useDeleteStationModal;
