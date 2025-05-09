import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Dashboard from "@/components/views/User/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "User Dashboard",
};

const UserDashboardPage = () => {
  return (
    <DashboardLayout title="Cek Kepadatan Stasiun" description="" type="user">
      <Dashboard />
    </DashboardLayout>
  );
};

export default UserDashboardPage;
