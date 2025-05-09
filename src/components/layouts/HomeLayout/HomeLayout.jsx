"use client";
import { Button } from "@nextui-org/react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const HomeLayout = ({ children }) => {
  const [isTransparent, setIsTransparent] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsTransparent(scrollY < window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <>
      <nav className={`flex items-center justify-between fixed top-0 z-50 w-full py-4 px-16 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-blue-900 text-white border-b border-blue-950"
      }`}>
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
