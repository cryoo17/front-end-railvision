import Link from "next/link";
import { FaBitcoin } from "react-icons/fa6";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../HomeLayout.constants";

const FooterLayout = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-blue-900 px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20">
      <FaBitcoin className="text-9xl" />
      <div className="mb-4 flex flex-col gap-4 lg:mb-0">
        <div>
          <h4 className="text-xl text-white">Customer Service</h4>
          <p className="text-gray-500">
            <Link href={"mailto:hello@railvision.id"}>hello@railvision.id</Link>{" "}
            | <Link href={"tel:+621234567890"}>+621234567890</Link>
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">Office</h4>
          <p className="text-gray-500">Central Area, Singapore</p>
        </div>
      </div>
      <div className="mb-10 flex flex-col gap-2 lg:mb-0">
        <h2 className="text-xl text-white lg:mb-2">Menu</h2>
        {NAV_ITEMS.map((item) => (
          <Link
            key={`footer-nav-${item.label}`}
            href={item.href}
            className="cursor-pointer text-gray-500 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-8 text-gray-500">
          {SOCIAL_ITEMS.map((item) => (
            <Link
              key={`footer-social-${item.label}`}
              href={item.href}
              className="text-3xl hover:text-white"
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <p className="w-full text-center text-gray-500">
          Copyright © 2025 Railvision. All right reserve
        </p>
      </div>
    </div>
  );
};

export default FooterLayout;
