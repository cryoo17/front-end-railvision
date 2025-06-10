import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Activation from "@/components/views/Auth/Activation/Activation";
import authServices from "@/services/auth.service";

export const metadata = {
  title: "Acara | Activation",
};

/**
 * Ini adalah Server Component, jadi kita bisa membuatnya async dan fetch data di sini.
 * @param {{ searchParams: { code: string } }} props - searchParams menggantikan context.query
 */
const ActivationPage = async ({ searchParams }) => {
  const { code } = searchParams;
  let status = "failed";

  if (code) {
    try {
      const result = await authServices.activation({ code: code });
      if (result.data.data) {
        status = "success";
      }
    } catch (error) {
      console.error("Activation failed on server:", error);
    }
  }

  return (
    <AuthLayout>
      <Activation status={status} />
    </AuthLayout>
  );
};

export default ActivationPage;
