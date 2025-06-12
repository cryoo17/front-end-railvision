"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const router = useRouter();
  const { children } = props;

  return (
    <section className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 antialiased lg:py-0">
      <div className="max-w-screen-3xl 3xl:container p-6">
        {children}
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="primary"
          onPress={() => router.push("/")}
        >
          Kembali ke halaman utama
        </Button>
      </div>
    </section>
  );
};

export default AuthLayout;
