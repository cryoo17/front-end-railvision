import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Activation from "@/components/views/Auth/Activation/Activation";
import authServices from "@/services/auth.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activation",
  description: "Activation",
};

interface ActivationPageProps {
  searchParams: {
    code?: string;
  };
}

const ActivationPage = async ({ searchParams }: ActivationPageProps) => {
  const { code } = searchParams;

  let status: "success" | "failed" = "failed";

  if (code) {
    try {
      const result = await authServices.activation({ code });
      if (result?.data?.data) {
        status = "success";
      }
    } catch (error) {
      console.error("Activation Error:", error);
    }
  }

  return (
    <AuthLayout>
      <Activation status={status} />
    </AuthLayout>
  );
};

export default ActivationPage;
