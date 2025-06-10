import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Activation from "@/components/views/Auth/Activation/Activation";
import authServices from "@/services/auth.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acara | Activation",
};

interface PageProps {
  searchParams: {
    code?: string;
  };
}

const ActivationPage = async ({ searchParams }: PageProps) => {
  let status: "success" | "failed" = "failed";

  const code = searchParams.code;

  if (code) {
    try {
      const result = await authServices.activation({ code });
      if (result.data.data) {
        status = "success";
      }
    } catch (error) {
      console.error("Activation failed:", error);
    }
  }

  return (
    <AuthLayout>
      <Activation status={status} />
    </AuthLayout>
  );
};

export default ActivationPage;
