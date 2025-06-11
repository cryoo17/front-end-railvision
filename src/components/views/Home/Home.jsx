"use client";

import { cn } from "@/utils/cn";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeStation from "./HomeStation/HomeStation";
import HomeCategory from "./HomeCategory/HomeCategory";
import useHome from "./useHome";
// import { Controller } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Home = () => {
  const router = useRouter();
  const { dataStation, isLoadingStation, dataCategory, isLoadingCategory } =
    useHome();
  return (
    <>
      <section
        className="min-h-screen bg-cover bg-center py-16 text-white"
        style={{ backgroundImage: "url('/images/bg-landing-page.jpg')" }}
      >
        <div className="mt-32 flex flex-col items-center justify-center gap-16 lg:gap-8 px-32">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-7xl lg:text-9xl font-bold">Railvision</h1>
          </div>
          <Button
            size="lg"
            color="primary"
            className="w-fit font-bold"
            onPress={() => router.push("/user")}
          >
            Coba Sekarang
          </Button>
        </div>
      </section>
      <section className="flex min-h-screen flex-col py-16" id="stasiun">
        <HomeStation
          title="Daftar Stasiun"
          station={dataStation?.data}
          isLoadingStation={isLoadingStation}
        />
        <HomeCategory
          category={dataCategory?.data}
          isLoadingCategory={isLoadingCategory}
        />
      </section>
      <section
        className="min-h-screen bg-blue-900 py-16 text-white"
        id="tentang"
      >
        <div className="flex-col lg:mt-32 flex lg:flex-row items-center justify-between mx-6 gap-4">
          <div className="flex flex-col gap-4 lg:gap-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-bold">Apa itu RailVision?</h1>
              <p className="text-lg lg:text-xl">
                Railvision adalah sistem manajemen keramaian berbasis visi komputer yang mampu mendeteksi dan menganalisis kepadatan penumpang, serta terintegrasi dengan infrastruktur stasiun
              </p>
            </div>
            <Button
              color="primary"
              className="w-fit"
              onPress={() => router.push("/user")}
            >
              Dashboard
            </Button>
          </div>
          <div className="border border-yellow-500 bg-yellow-500 p-2">
            <Image
              src={"/images/image 1.png"}
              alt="gambar"
              height={100}
              width={900}
            />
          </div>
        </div>
      </section>
      <section className="min-h-screen py-16" id="hubungi">
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="mb-12 text-4xl font-extrabold text-blue-500">
            Hubungi Kami
          </h2>
          <Card>
            <CardBody className="p-8">
              <form
                className={cn("flex w-80 flex-col gap-4")}
                onSubmit={() => {}}
              >
                <Input
                  // {...field}
                  type="text"
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                  //   isInvalid={errors.fullName !== undefined}
                  //   errorMessage={errors.fullName?.message}
                />
                <Input
                  // {...field}
                  type="text"
                  label="Whatsapp Number"
                  variant="bordered"
                  autoComplete="off"
                  //   isInvalid={errors.username !== undefined}
                  //   errorMessage={errors.username?.message}
                />
                <Input
                  // {...field}
                  type="email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  //   isInvalid={errors.email !== undefined}
                  //   errorMessage={errors.email?.message}
                />
                <Input
                  type="text"
                  label="Message"
                  variant="bordered"
                  autoComplete="off"
                />
                {/* <Controller
                  name="password"
                  control={""}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={visiblePassword.password ? "text" : "password"}
                      label="Password"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={errors.password !== undefined}
                      errorMessage={errors.password?.message}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() => handleVisiblePassword("password")}
                        >
                          {visiblePassword.password ? (
                            <FaEye className="pointer-events-none text-xl text-default-400" />
                          ) : (
                            <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                          )}
                        </button>
                      }
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={""}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={
                        visiblePassword.confirmPassword ? "text" : "password"
                      }
                      label="Password Confirmation"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={errors.confirmPassword !== undefined}
                      errorMessage={errors.confirmPassword?.message}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() =>
                            handleVisiblePassword("confirmPassword")
                          }
                        >
                          {visiblePassword.confirmPassword ? (
                            <FaEye className="pointer-events-none text-xl text-default-400" />
                          ) : (
                            <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                          )}
                        </button>
                      }
                    />
                  )}
                /> */}
                <Button color="primary" size="lg" type="submit">
                  Send
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
};
export default Home;
