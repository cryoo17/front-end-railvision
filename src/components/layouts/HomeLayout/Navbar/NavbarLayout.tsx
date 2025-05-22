"use client";

import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { BUTTON_ITEMS, NAV_ITEMS } from "../HomeLayout.constants";
import useNavbarLayout from "./useNavbarLayout";
import { usePathname } from "next/navigation";

const NavbarLayout = () => {
  const pathname = usePathname();
  const session = useSession();
  const [isTransparent, setIsTransparent] = useState(true);
  const { dataProfile } = useNavbarLayout();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsTransparent(scrollY < window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      maxWidth="full"
      className={`fixed top-0 z-50 px-16 py-4 ${
        isTransparent
          ? "bg-transparent text-white"
          : "border-b border-blue-950 bg-blue-900 text-white"
      }`}
      isBordered
      isBlurred={false}
      // shouldHideOnScroll
    >
      <div
        /*className="2xl:container"*/
        className="flex w-full items-center justify-between transition-all duration-300"
      >
        <div className="flex items-center gap-8">
          <NavbarBrand as={Link} href={"/"}>
            <Link href={"/"} className="text-2xl font-bold text-white">
              RailVision
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={`nav-${item.label}`}
                as={Link}
                href={item.href}
                className={cn("text-medium text-white hover:text-blue-700", {
                  "font-bold text-blue-500": pathname === item.href,
                })}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
        <NavbarContent justify="end">
          <NavbarMenuToggle className="lg:hidden" />

          <NavbarItem className="hidden lg:relative lg:flex">
            <Input
              isClearable
              className="w-[300px]"
              placeholder="Cari Stasiun"
              startContent={<CiSearch />}
              onClear={() => {}}
              onChange={() => {}}
            />
          </NavbarItem>
          {session.status === "authenticated" ? (
            <NavbarItem className="hidden lg:block">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    src={dataProfile?.profilePicture}
                    className="cursor-pointer"
                    showFallback
                    // name={dataProfile?.fullName}
                  />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key={"admin"}
                    href="/admin/dashboard"
                    className={cn({
                      hidden: dataProfile?.role !== "admin",
                    })}
                  >
                    Admin
                  </DropdownItem>
                  <DropdownItem key={"profile"} href="/member/profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem key={"signout"} onPress={() => signOut()}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <div className="hidden lg:flex lg:gap-4">
              {BUTTON_ITEMS.map((item) => (
                <NavbarItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    color={item.color as ButtonProps["color"]}
                    href={item.href}
                  >
                    {item.label}
                  </Button>
                </NavbarItem>
              ))}
            </div>
          )}

          <NavbarMenu className="gap-4 bg-white">
            {NAV_ITEMS.map((item) => (
              <NavbarMenuItem
                key={`nav-${item.label}`}
                className={cn(
                  "font-medium text-default-700 hover:text-blue-700",
                  {
                    "font-bold text-blue-500": pathname === item.href,
                  },
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </NavbarMenuItem>
            ))}
            {session.status === "authenticated" ? (
              <Fragment>
                <NavbarMenuItem
                  className={cn(
                    "font-medium text-default-700 hover:text-blue-700",
                    {
                      hidden: dataProfile?.role !== "admin",
                    },
                  )}
                >
                  <Link href={"/admin/dashboard"}>Admin</Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="font-medium text-default-700 hover:text-blue-700">
                  <Link href={"/member/profile"}>Profile</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Button
                    color="primary"
                    onPress={() => signOut()}
                    className="mt-2 w-full"
                    variant="bordered"
                    size="md"
                  >
                    Logout
                  </Button>
                </NavbarMenuItem>
              </Fragment>
            ) : (
              <Fragment>
                {BUTTON_ITEMS.map((item) => (
                  <NavbarMenuItem key={`button-${item.label}`}>
                    <Button
                      as={Link}
                      color={item.color as ButtonProps["color"]}
                      href={item.href}
                      fullWidth
                      size="md"
                    >
                      {item.label}
                    </Button>
                  </NavbarMenuItem>
                ))}
              </Fragment>
            )}
          </NavbarMenu>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavbarLayout;
