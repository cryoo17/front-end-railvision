import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Category from "@/components/views/Admin/Category/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="List of all categories, create new category, and manage exist categories"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
