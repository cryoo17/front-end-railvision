import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Dashboard from "@/components/views/User/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "User Dashboard",
};

const DashboardUserPage = () => {
  return (
    <DashboardLayout title="Dashboard" description="Dashboard User" type="user">
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardUserPage;
