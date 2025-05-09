import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Admin"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
