import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import usePassword from "./usePassword";
import { Controller } from "react-hook-form";

const PasswordCard = () => {
  const {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorsUpdatePassword,
    isPendingMutateUpdatePassword,
    handleUpdatePassword,
  } = usePassword();

  return (
    <Card className="w-full p-4 lg:max-w-2xl">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Ubah Password</h1>
        <p className="w-full text-small text-default-400">
          Ubah password akun Anda di sini. Pastikan untuk mengingatnya dan tidak
          membagikannya kepada orang lain.
        </p>
      </CardHeader>
      <CardBody>
        <section>
          <form onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)} className="flex flex-col gap-4">
            <Controller
              name="oldPassword"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password Lama"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Masukkan password lama"
                  isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                  errorMessage={errorsUpdatePassword.oldPassword?.message}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password Baru"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Masukkan password baru"
                  isInvalid={errorsUpdatePassword.newPassword !== undefined}
                  errorMessage={errorsUpdatePassword.newPassword?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Konsfirmasi Password"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Masukkan konfirmasi password"
                  isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                  errorMessage={errorsUpdatePassword.confirmPassword?.message}
                />
              )}
            />
            <Button
              color="primary"
              className="disabled:bg-default-500 w-fit justify-end"
              type="submit"
              isLoading={isPendingMutateUpdatePassword}
              isDisabled={isPendingMutateUpdatePassword}
            >
              {isPendingMutateUpdatePassword ? (
                <Spinner size="sm" />
              ) : (
                "Ubah Password"
              )}
            </Button>
          </form>
        </section>
      </CardBody>
    </Card>
  );
};

export default PasswordCard;
