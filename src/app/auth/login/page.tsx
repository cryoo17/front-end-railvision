import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Login from "@/components/views/Auth/Login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
