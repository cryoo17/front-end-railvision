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

export default async function ActivationPage({
  searchParams,
}: ActivationPageProps) {
  const { code } = searchParams;

  let status: "success" | "failed" = "failed";

  if (code) {
    try {
      const result = await authServices.activation({ code });
      if (result?.data?.data) {
        status = "success";
      }
    } catch (error) {
      console.error("Activation API Error:", error);
    }
  }

  return <Activation status={status} />;
}
