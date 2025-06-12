"use client";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const { status } = props;

  return (
    <div className="flex w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-blue-500">
          {status === "success" ? "Aktifasi Berhasil" : "Aktifasi Gagal"}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {status === "success"
            ? "Terima kasih telah mengaktifkan akun Anda!"
            : "Kode aktifasi tidak valid"}
        </p>
      </div>
    </div>
  );
};

export default Activation;
