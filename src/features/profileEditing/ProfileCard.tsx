import {
  useProfileEditing,
  useProfileData,
  EditableAvatar,
  EditableName,
  EditableBio
} from "@/features/profileEditing";
import cls from "./ProfileCard.module.scss";
import { Notification } from "@/shared/assets/icons/Notification";
import { Settings } from "@/shared/assets/icons/Settings";
import { Support } from "@/shared/assets/icons/Support";
import { Escape } from "@/shared/assets/icons/Escape";
import { CopyIcon } from "@/shared/assets/icons/CopyIcon";
import { Accept } from "@/shared/assets/icons/Accept";
import { Upload } from "@/shared/assets/icons/Upload";
import { Avatar } from "@/shared/ui/Avatar";

export const ProfileCard = () => {
  const { isEditing, toggleEditing, exitEditing } = useProfileEditing();
  const { profileData, setName, setBio, setAvatar } = useProfileData();

  const handleAvatarChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);
  };

  const handleSave = () => {
    console.log("Сохранение профиля...", profileData);
    {
      /* Тут ваще должна быть логика отправки данных на бэк*/
    }
    exitEditing();
  };

  return (
    <div className={cls.profileCard}>
      <div className={cls.leftSide}>
        {isEditing ? (
          <EditableAvatar
            username={profileData.name}
            currentAvatar={profileData.avatar}
            onAvatarChange={handleAvatarChange}
          />
        ) : (
          <Avatar size="large" username={profileData.name} src={profileData.avatar} />
        )}
        <div className={cls.profileInfo}>
          {isEditing ? (
            <EditableName value={profileData.name} onChange={setName} className={cls.editableField} />
          ) : (
            <h2 className={cls.nickName}>{profileData.name}</h2>
          )}
          {isEditing ? (
            <EditableBio value={profileData.bio} onChange={setBio} className={cls.editableField} />
          ) : (
            <span className={cls.description}>{profileData.bio}</span>
          )}
          <div className={cls.infoContainer}>
            {/* тут тоже с бэком подвязать надо как то чета*/}
            <span>Проектов в работе: 2</span>
            <span>Заметок: 2</span>
            <span>Дней посещений подряд: 8</span>
          </div>
        </div>
      </div>
      <div className={`${cls.rightSide} ${isEditing ? cls.rightSideEditing : ""}`}>
        <div className={cls.navIcons}>
          {isEditing ? (
            // Режим редактирования
            <>
              <button className={cls.uploadButton}>
                <Upload />
              </button>
              <button className={cls.saveButton} onClick={handleSave}>
                <Accept />
              </button>
            </>
          ) : (
            <>
              <button className={cls.Notification}>
                <Notification />
              </button>
              <button className={cls.Support}>
                <Support />
              </button>
              <button className={cls.Settings} onClick={toggleEditing}>
                <Settings />
              </button>
              <button className={cls.Escape}>
                <Escape />
              </button>
            </>
          )}
        </div>
        {!isEditing && (
          <div className={cls.idContainer}>
            <p className={cls.idStyle}>ID 1828435865</p>
            <button className={cls.CopyIcon}>
              <CopyIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
