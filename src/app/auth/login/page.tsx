import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

const Login = dynamic(() => import("@/components/views/Auth/Login/Login"), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
