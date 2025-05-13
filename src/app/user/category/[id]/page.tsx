import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import DetailCategory from "@/components/views/User/Category/DetailCategory/DetailCategory";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Category"
      description="Information for this category"
      type="user"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDetailCategoryPage;