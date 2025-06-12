import { CiGrid41, CiShoppingTag, CiUser } from "react-icons/ci";
import { PiTrainRegionalDuotone } from "react-icons/pi";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "station",
    label: "Station",
    href: "/admin/station",
    icon: <PiTrainRegionalDuotone />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <CiShoppingTag />,
  },
  // {
  //   key: "banner",
  //   label: "Banner",
  //   href: "/admin/banner",
  //   icon: <CiBookmark />,
  // },
  // {
  //   key: "transaction",
  //   label: "Transaction",
  //   href: "/admin/transaction",
  //   icon: <CiWallet />,
  // },
];

const SIDEBAR_USER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/user/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "station",
    label: "Stasiun",
    href: "/user/station",
    icon: <PiTrainRegionalDuotone />,
  },
  {
    key: "category",
    label: "Kategori",
    href: "/user/category",
    icon: <CiShoppingTag />,
  },
  // {
  //   key: "transaction",
  //   label: "Transaction",
  //   href: "/user/transaction",
  //   icon: <CiWallet />,
  // },
  {
    key: "profile",
    label: "Profile",
    href: "/user/profile",
    icon: <CiUser />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_USER };
