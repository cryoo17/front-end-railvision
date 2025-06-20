"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const RegisterSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-blue-500">
          Buat akun berhasil
        </h1>
        <p className="text-xl font-bold text-default-500">
          Cek email Anda untuk mengaktifkan akun Anda.
        </p>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="primary"
          onClick={() => router.push("/")}
        >
          Kembali ke home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
