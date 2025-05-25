// import { Button } from "@nextui-org/react";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
import Home from "@/components/views/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page",
};

const Page = () => {
  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  );
};

export default Page;
