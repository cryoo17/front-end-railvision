import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Register from "@/components/views/Register/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register",
};

const RegisterPage = () => {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
