import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteStationModal from "./useDeleteStationModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchStation: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteStationModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchStation,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteStation,
    isPendingMutateDeleteStation,
    isSuccessMutateDeleteStation,
  } = useDeleteStationModal();

  useEffect(() => {
    if (isSuccessMutateDeleteStation) {
      onClose();
      refetchStation();
    }
  }, [isSuccessMutateDeleteStation]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Station</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this station?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteStation}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteStation}
            onPress={() => mutateDeleteStation(selectedId)}
          >
            {isPendingMutateDeleteStation ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Station"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteStationModal;
