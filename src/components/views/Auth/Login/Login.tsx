"use client";

import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full flex-col items-center justify-center lg:flex-row">
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-blue-500">Masuk</h2>
          <p className="mb-4 mt-2 text-small">
            Tidak punya akun?&nbsp;
            <Link
              href={"/auth/register"}
              className="font-semibold text-blue-400"
            >
              Daftar disini
            </Link>
          </p>
          {errors.root && (
            <p className="text-blue mb-2 font-medium">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col gap-4",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email / Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                />
              )}
            />
            <Button color="primary" size="lg" type="submit">
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Masuk"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
