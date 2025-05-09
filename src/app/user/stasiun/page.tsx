import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Stasiun from "@/components/views/User/Stasiun/Stasiun";

const UserStasiunPage = () => {
  return (
    <DashboardLayout title="Daftar Stasiun Populer" description="" type="user">
      <Stasiun/>
    </DashboardLayout>
  );
};

export default UserStasiunPage;
