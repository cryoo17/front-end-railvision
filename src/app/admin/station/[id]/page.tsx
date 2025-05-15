import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import DetailStation from "@/components/views/Admin/Station/DetailStation/DetailStation";

const AdminDetailEventPage = () => {
  return (
    <DashboardLayout
      title="Detail Event"
      description="Manage information for this event"
      type="admin"
    >
      <DetailStation />
    </DashboardLayout>
  );
};

export default AdminDetailEventPage;
