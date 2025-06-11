import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import DetailCategory from "@/components/views/User/Category/DetailCategory/DetailCategory";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Kategori"
      description=""
      type="user"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDetailCategoryPage;