"use client";

import useProfile from "./useProfile";
import ProfileCard from "./ProfileCard/ProfileCard";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();
  return (
    // <Tabs aria-label="Options">
    //   <Tab key="Picture" title="Picture">
    //     <PictureTab
    //       currentPicture={dataProfile?.profilePicture}
    //       onUpdate={handleUpdateProfile}
    //       isPendingUpdate={isPendingMutateUpdateProfile}
    //       isSuccessUpdate={isSuccessMutateUpdateProfile}
    //     />
    //   </Tab>
    //   <Tab key="Info" title="Info">
    //     <InfoTab
    //       dataProfile={dataProfile}
    //       onUpdate={handleUpdateProfile}
    //       isPendingUpdate={isPendingMutateUpdateProfile}
    //       isSuccessUpdate={isSuccessMutateUpdateProfile}
    //     />
    //   </Tab>
    //   {/* <Tab key="Security" title="Security">
    //     <SecurityTab />
    //   </Tab> */}
    // </Tabs>
    <div>
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
    </div>
  );
};

export default Profile;
