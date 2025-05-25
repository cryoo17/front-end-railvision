import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
import Explore from "@/components/views/Explore/Explore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Page",
  description: "Explore Page",
};

const ExplorePage = () => {
  return (
    <HomeLayout>
      <Explore />
    </HomeLayout>
  );
};

export default ExplorePage;
