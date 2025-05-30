"use client";

import { Avatar, Button, Card, CardBody, Input } from "@nextui-org/react";
import useProfile from "./useProfile";

const Profile = () => {
  const { dataProfile } = useProfile();

  return (
    <>
      {/* Profile Section */}
      <Card className=" mb-6 max-w-2xl">
        <CardBody>
          <h2 className="mb-4 text-xl font-semibold">Ubah Profil</h2>
          <div className="mb-6 flex items-center">
            <Avatar
              src={dataProfile?.profilePicture}
              className="cursor-pointer h-24 w-24"
              showFallback
            />
            <Button className="ml-4">Ubah Foto</Button>
          </div>
          <form>
            <div className="mb-4">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Full Name"
                defaultValue={dataProfile?.fullName || ""}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                defaultValue={dataProfile?.username || ""}
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                defaultValue={dataProfile?.email || ""}
              />
            </div>
            <Button className="w-full">Simpan Perubahan</Button>
          </form>
        </CardBody>
      </Card>

      {/* Password Section */}
      <Card className="max-w-2xl">
        <CardBody>
          <h2 className="mb-4 text-xl font-semibold">Ubah Password</h2>
          <form>
            <div className="relative mb-4">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="newPassword"
              >
                Password Baru
              </label>
              <Input id="newPassword" type="password" placeholder="********" />
            </div>
            <div className="relative mb-4">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="confirmNewPassword"
              >
                Konfirmasi Password Baru
              </label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="********"
              />
            </div>
            <Button className="w-full">Simpan Password</Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Profile;
