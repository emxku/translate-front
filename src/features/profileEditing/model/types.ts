export interface UseProfileEditingReturn {
  isEditing: boolean;
  toggleEditing: () => void;
  enterEditing: () => void;
  exitEditing: () => void;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatar?: string;
}

export interface UseProfileDataReturn {
  profileData: ProfileData;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  setAvatar: (avatar: string) => void;
  updateProfileData: (newData: Partial<ProfileData>) => void;
  resetToInitial: () => void;
}
