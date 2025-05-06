"use client";
import { Button } from "@nextui-org/react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomeLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <nav className="flex items-center justify-between bg-blue-900 py-4 px-16 text-white border-b-1 border-blue-950 sticky top-0 z-50">
        <Link href={"/"}>Railvision</Link>
        <ul className="flex flex-row gap-4">
          <li className="">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="">
            <Link href={"/"}>Stasiun</Link>
          </li>
          <li className="">
            <Link href={"/"}>Tentang</Link>
          </li>
          <li className="">
            <Link href={"/"}>Hubungi</Link>
          </li>
        </ul>
        <div className="flex flex-row gap-2">
          <Button onPress={() => router.push("/auth/login")}>Masuk</Button>
          <Button onPress={() => router.push("/auth/register")}>Daftar</Button>
        </div>
      </nav>
      <section className="">{children}</section>
      <footer className="bg-blue-900 p-4 px-16 text-center text-white">
        <p>&copy; RailVision 2045 indonesia emas</p>
      </footer>
    </>
  );
};
export default HomeLayout;
