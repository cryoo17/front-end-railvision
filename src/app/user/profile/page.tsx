"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Profile from "@/components/views/User/Profile/Profile";

const userProfilePage = () => {
  return (
    <DashboardLayout title="User Profile" description="" type="user">
      <Profile />
    </DashboardLayout>
  );
};

export default userProfilePage;
