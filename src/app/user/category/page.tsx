import Category from "@/components/views/User/Category/Category";
import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Category",
  description: "User Category",
};

const UserCategoryPage = () => {
  return (
    <DashboardLayout title="Kategori Status Stasiun" description="" type="user">
      <Category />
    </DashboardLayout>
  );
};

export default UserCategoryPage;