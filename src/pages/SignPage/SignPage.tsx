import { Auth } from "@/features/Auth/Auth";
// import { Logo } from "@/shared/assets/icons/Logo";
import cls from "./SignPage.module.scss";

export const SignPage = () => {
  return (
    <div className={cls.wrapper}>
      {/* <Logo /> */}
      <Auth />
    </div>
  );
};
