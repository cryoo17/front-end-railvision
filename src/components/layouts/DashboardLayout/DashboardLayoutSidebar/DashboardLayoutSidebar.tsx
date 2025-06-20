"use client";

import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }: PropTypes) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <section>
        <div className="flex w-full justify-center">
          <Link
            href={"/"}
            className="mb-6 w-32 text-3xl font-bold text-blue-500"
          >
            Railvision
          </Link>
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
          onAction={(key) =>
            router.push(
              sidebarItems.find((item) => item.key === key)?.href || "/",
            )
          }
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-blue-500 text-white": pathname.startsWith(item.href),
              })}
              startContent={item.icon}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </section>
      <div className="flex items-center p-1">
        <Button
          color="primary"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
          onPress={() => signOut()}
        >
          <CiLogout />
          Keluar
        </Button>
      </div>
    </section>
  );
};

export default DashboardLayoutSidebar;
