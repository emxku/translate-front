import { useState } from "react";

export interface ProfileData {
  name: string;
  bio: string;
  avatar?: string;
}

export const useProfileData = (initialData?: Partial<ProfileData>) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: initialData?.name || "User",
    bio: initialData?.bio || "Bio",
    avatar: initialData?.avatar
  });

  const setName = (name: string) => {
    setProfileData((prev) => ({ ...prev, name }));
  };

  const setBio = (bio: string) => {
    setProfileData((prev) => ({ ...prev, bio }));
  };

  const setAvatar = (avatar: string) => {
    setProfileData((prev) => ({ ...prev, avatar }));
  };

  const updateProfileData = (newData: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
  };

  const resetToInitial = () => {
    setProfileData({
      name: initialData?.name || "User",
      bio: initialData?.bio || "Bio",
      avatar: initialData?.avatar
    });
  };

  return {
    profileData,
    setName,
    setBio,
    setAvatar,
    updateProfileData,
    resetToInitial
  };
};
