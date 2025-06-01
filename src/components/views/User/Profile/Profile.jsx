"use client";

import { Avatar, Button, Card, CardBody, Input } from "@nextui-org/react";
import useProfile from "./useProfile";
import { useState } from "react";

const Profile = () => {
  const { 
    dataProfile, 
    handleUpdateProfile,
    handleUpdatePassword,
    isPendingUpdateProfile,
    isPendingUpdatePassword,
  } = useProfile();

  const [fullName, setFullName] = useState(dataProfile?.fullName || "");
  const [profileError, setProfileError] = useState("");

  // const [passwordData, setPasswordData] = useState({
  //   newPassword: "",
  //   confirmNewPassword: ""
  // });
  // const [passwordErrors, setPasswordErrors] = useState({
  //   newPassword: "",
  //   confirmNewPassword: ""
  // });

  const onSubmitProfile = (e) => {
    e.preventDefault();
    setProfileError("");

    if (!fullName.trim()) {
      setProfileError("Full name is required");
      return;
    }

    handleUpdateProfile(fullName);
  };

  // const onSubmitPassword = (e) => {
  //   e.preventDefault();
  //   setPasswordErrors({
  //     newPassword: "",
  //     confirmNewPassword: ""
  //   });

  //   let isValid = true;
  //   const newErrors = {
  //     newPassword: "",
  //     confirmNewPassword: ""
  //   };

  //   if (!passwordData.newPassword) {
  //     newErrors.newPassword = "New password is required";
  //     isValid = false;
  //   } else if (passwordData.newPassword.length < 6) {
  //     newErrors.newPassword = "Password must be at least 6 characters";
  //     isValid = false;
  //   }

  //   if (passwordData.newPassword !== passwordData.confirmNewPassword) {
  //     newErrors.confirmNewPassword = "Passwords don't match";
  //     isValid = false;
  //   }

  //   if (!isValid) {
  //     setPasswordErrors(newErrors);
  //     return;
  //   }

  //   handleUpdatePassword(passwordData.newPassword);
  //   setPasswordData({
  //     newPassword: "",
  //     confirmNewPassword: ""
  //   });
  // };

  return (
    <>
      {/* Profile Section */}
      <Card className="mb-6 max-w-2xl">
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
          <form onSubmit={onSubmitProfile}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium" htmlFor="fullName">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                isInvalid={!!profileError}
                errorMessage={profileError}
                variant="bordered"
                disabled={isPendingUpdateProfile}
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium" htmlFor="username">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={dataProfile?.username || ""}
                isReadOnly
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
                value={dataProfile?.email || ""}
                isReadOnly
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              isLoading={isPendingUpdateProfile}
              disabled={isPendingUpdateProfile}
              color="primary"
            >
              Simpan Perubahan
            </Button>
          </form>
        </CardBody>
      </Card>

      {/* Password Section */}
      <Card className="max-w-2xl">
        <CardBody>
          <h2 className="mb-4 text-xl font-semibold">Ubah Password</h2>
          <form onSubmit={onSubmitPassword}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium" htmlFor="newPassword">
                Password Baru
              </label>
              <Input 
                id="newPassword"
                type="password" 
                placeholder="Masukkan password baru"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })}
                isInvalid={!!passwordErrors.newPassword}
                errorMessage={passwordErrors.newPassword}
                variant="bordered"
                disabled={isPendingUpdatePassword}
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium" htmlFor="confirmNewPassword">
                Konfirmasi Password Baru
              </label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="Konfirmasi password"
                value={passwordData.confirmNewPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  confirmNewPassword: e.target.value
                })}
                isInvalid={!!passwordErrors.confirmNewPassword}
                errorMessage={passwordErrors.confirmNewPassword}
                variant="bordered"
                disabled={isPendingUpdatePassword}
              />
            </div>
            <Button 
              className="w-full"
              type="submit"
              isLoading={isPendingUpdatePassword}
              disabled={isPendingUpdatePassword}
              color="primary"
            >
              Simpan Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Profile;