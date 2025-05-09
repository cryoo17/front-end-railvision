import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import History from "@/components/views/User/History/History";

const UserHistoryPage = () => {
    return (
        <DashboardLayout title="History" description="" type="user">
            <History />
        </DashboardLayout>
    )
}

export default UserHistoryPage;