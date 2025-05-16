import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Station from "@/components/views/User/Station/Station";

const UserStasiunPage = () => {
  return (
    <DashboardLayout title="Daftar Stasiun Populer" description="" type="user">
      <Station/>
    </DashboardLayout>
  );
};

export default UserStasiunPage;
