import cls from "./ProfilePage.module.scss";
import { ProfileCard } from "@/features/profileEditing";
import { BookList } from "@/features/bookList/BookList";
import { Notes } from "@/features/notes/Notes";

export const ProfilePage = () => {
  return (
    <div className={cls.wrapper}>
      <ProfileCard />
      <BookList />
      <Notes />
    </div>
  );
};
