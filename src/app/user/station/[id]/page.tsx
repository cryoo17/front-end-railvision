import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import DetailStation from "@/components/views/User/Station/DetailStation/DetailStation";

const UserDetailStationPage = () => {
  return (
    <DashboardLayout
      title="Detail Station"
      description=""
      type="user"
    >
      <DetailStation />
    </DashboardLayout>
  );
};

export default UserDetailStationPage;
