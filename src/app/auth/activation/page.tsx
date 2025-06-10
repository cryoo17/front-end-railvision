import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Activation from "@/components/views/Auth/Activation/Activation";
import authServices from "@/services/auth.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activation",
  description: "Activation",
};

interface ActivationPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ActivationPage = async ({ searchParams }: ActivationPageProps) => {
  const code = searchParams.code as string;
  let status: "success" | "failed";

  try {
    const result = await authServices.activation({ code });
    status = result.data.data ? "success" : "failed";
  } catch (error) {
    status = "failed";
  }

  return (
    <AuthLayout>
      <Activation status={status} />
    </AuthLayout>
  );
};

export default ActivationPage;
