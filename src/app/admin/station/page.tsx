import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Station from "@/components/views/Admin/Station/Station";

const AdminStationPage = () => {
  return (
    <DashboardLayout
      title="Stations"
      description="List of all stations, create new station, and manage exist stations"
      type="admin"
    >
      <Station />
    </DashboardLayout>
  );
};

export default AdminStationPage;
