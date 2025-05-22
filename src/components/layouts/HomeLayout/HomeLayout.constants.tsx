import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Stasiun",
    href: "/#stasiun",
  },
  {
    label: "Tentang",
    href: "/#tentang",
  },
  {
    label: "Hubungi",
    href: "/#hubungi",
  },
];

const BUTTON_ITEMS = [
  {
    label: "Register",
    href: "/auth/register",
    color: "default",
  },
  {
    label: "Login",
    href: "/auth/login",
    color: "warning",
  },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebook />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <FaInstagram />,
  },
  {
    label: "Tiktok",
    href: "https://tiktok.com",
    icon: <FaTiktok />,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: <FaXTwitter />,
  },
  {
    label: "Youtube",
    href: "https://youtube.com",
    icon: <FaYoutube />,
  },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
