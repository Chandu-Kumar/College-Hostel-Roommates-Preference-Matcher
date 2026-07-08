import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const { user } = useAuth();

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold">

                Welcome {user?.name} 👋

            </h1>

            <div className="mt-8 bg-white rounded-xl shadow p-6">

                <p><strong>Email:</strong> {user?.email}</p>

                <p><strong>Role:</strong> {user?.role}</p>

            </div>

        </MainLayout>

    );
}

export default Dashboard;