import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Activation from "@/components/views/Auth/Activation/Activation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acara | Activation",
};

const ActivationPage = async () => {
  const status: "success" | "failed" = "success";

  return (
    <AuthLayout>
      <Activation status={status} />
    </AuthLayout>
  );
};

export default ActivationPage;
