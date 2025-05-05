import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Activation from "@/components/views/Auth/Activation/Activation";
import authServices from "@/services/auth.service";

const ActivationPage = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const code = searchParams.code;
  let status: "success" | "failed";

  try {
    const result = await authServices.activation({ code });
    status = result.data.data ? "success" : "failed";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
