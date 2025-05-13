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
  onPressButtonDetail: () => void;
}

const DropdownActionUser = (props: PropTypes) => {
  const { textButtonDetail, onPressButtonDetail } = props;
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
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownActionUser;
