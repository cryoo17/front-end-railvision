"use client";

import { ReactNode, Suspense, useState } from "react";
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@nextui-org/react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar/DashboardLayoutSidebar";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = "user" } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_USER}
          isOpen={open}
        />
        <section className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          <Suspense>{children}</Suspense>
        </section>
      </section>
    </>
  );
};

export default DashboardLayout;
