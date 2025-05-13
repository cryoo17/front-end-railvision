import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  textButtonDetail: string;
  textButtonDelete: string;
  onPressButtonDetail: () => void;
  onPressButtonDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {
  const {
    textButtonDetail,
    textButtonDelete,
    onPressButtonDetail,
    onPressButtonDelete,
  } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key={"detail-button"} onPress={onPressButtonDetail}>
          {textButtonDetail}
        </DropdownItem>
        <DropdownItem
          key={"delete-button"}
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          {textButtonDelete}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
