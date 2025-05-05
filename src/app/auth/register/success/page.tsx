import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess/RegisterSuccess";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Success",
  description: "Register Success",
};

const RegisterSuccessPage = () => {
  return (
    <AuthLayout>
      <RegisterSuccess />
    </AuthLayout>
  );
};

export default RegisterSuccessPage;
