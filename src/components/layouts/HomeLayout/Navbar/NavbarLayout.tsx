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
  Link,
  Listbox,
  ListboxItem,
  Spinner,
} from "@nextui-org/react";
import { cn } from "@/utils/cn";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { BUTTON_ITEMS, NAV_ITEMS } from "../HomeLayout.constants";
import useNavbarLayout from "./useNavbarLayout";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IStation } from "@/types/Station";

const NavbarLayout = () => {
  const pathname = usePathname();
  const session = useSession();
  const [isTransparent, setIsTransparent] = useState(true);
  const {
    dataProfile,
    dataStationSearch,
    isLoadingStationSearch,
    isRefetchingStationSearch,
    handleSearch,
    search,
    setSearch,
  } = useNavbarLayout();

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsTransparent(scrollY < window.innerHeight);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setIsTransparent(false);
    }
  }, [pathname]);

  return (
    <Navbar
      maxWidth="full"
      className={`fixed top-0 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-blue-900"
      }`}
      isBordered
      isBlurred={false}
      // shouldHideOnScroll
    >
      {/* <div
        className="2xl:container"
      > */}
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href={"/"}>
          <h1
            className={`${isTransparent ? "text-2xl font-bold text-white" : "text-2xl font-bold text-white"}`}
          >
            RailVision
          </h1>
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn(
                "text-medium hover:text-blue-700",
                isTransparent ? "text-white" : "text-white",
                {
                  "font-bold text-blue-500": pathname === item.href,
                },
              )}
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
            onClear={() => setSearch("")}
            onChange={handleSearch}
          />
          {search !== "" && (
            <Listbox
              items={dataStationSearch?.data || []}
              className="absolute right-0 top-12 rounded-xl border bg-white"
            >
              {!isRefetchingStationSearch && !isLoadingStationSearch ? (
                (item: IStation) => (
                  <ListboxItem key={item._id} href={`/event/${item.slug}`}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={`${item.icon}`}
                        alt={`${item.name}`}
                        className="w-2/5 rounded-md"
                        width={100}
                        height={40}
                      />
                      <p className="line-clamp-2 w-3/5 text-wrap">
                        {item.name}
                      </p>
                    </div>
                  </ListboxItem>
                )
              ) : (
                <ListboxItem key="loading">
                  <Spinner color="primary" size="sm" />
                </ListboxItem>
              )}
            </Listbox>
          )}
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
                <DropdownItem key={"profile"} href="/user/profile">
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
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn(
                  "font-medium text-default-700 hover:text-blue-700",
                  {
                    "font-bold text-blue-500": pathname === item.href,
                  },
                )}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn({
                  hidden: dataProfile?.role !== "admin",
                })}
              >
                <Link
                  href={"/admin/dashboard"}
                  className="font-medium text-default-700 hover:text-blue-700"
                >
                  Admin
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href={"/user/profile"}
                  className="font-medium text-default-700 hover:text-blue-700"
                >
                  Profile
                </Link>
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
      {/* </div> */}
    </Navbar>
  );
};

export default NavbarLayout;
