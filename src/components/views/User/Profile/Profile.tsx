"use client";

import useProfile from "./useProfile";
import ProfileCard from "./ProfileCard/ProfileCard";
import PasswordCard from "./PasswordCard/PasswordCard";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();
  return (
    <div className="flex flex-col gap-6">
      <ProfileCard
        currentPicture={dataProfile?.profilePicture}
        onUpdatePicture={handleUpdateProfile}
        isPendingUpdatePicture={isPendingMutateUpdateProfile}
        isSuccessUpdatePicture={isSuccessMutateUpdateProfile}
        dataProfile={dataProfile}
        onUpdate={handleUpdateProfile}
        isPendingUpdate={isPendingMutateUpdateProfile}
        isSuccessUpdate={isSuccessMutateUpdateProfile}
      />
      <PasswordCard/>
    </div>
  );
};

export default Profile;
