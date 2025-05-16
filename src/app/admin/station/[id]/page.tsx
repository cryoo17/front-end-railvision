import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import DetailStation from "@/components/views/Admin/Station/DetailStation/DetailStation";

const AdminDetailStationPage = () => {
  return (
    <DashboardLayout
      title="Detail Station"
      description="Manage information for this station"
      type="admin"
    >
      <DetailStation />
    </DashboardLayout>
  );
};

export default AdminDetailStationPage;
