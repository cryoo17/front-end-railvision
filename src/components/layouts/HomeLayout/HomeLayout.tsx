"use client";

import { ReactNode } from "react";
import NavbarLayout from "./Navbar/NavbarLayout";
import FooterLayout from "./FooterLayout/FooterLayout";

interface PropTypes {
  children: ReactNode;
}

const HomeLayout = (props: PropTypes) => {
  const { children } = props;

  return (
    <section>
      <NavbarLayout />
      <div /*className="py-10 md:p-6"*/>{children}</div>
      <FooterLayout />
    </section>
  );
};
export default HomeLayout;
