import cls from "./Auth.module.scss";
import { useState } from "react";
import { SignupForm } from "./SignupForm/SignupForm";
import { Button } from "@/shared/ui/Button/Button";
import { SigninForm } from "./SigninForm/SigninForm";

export const Auth = () => {
  const [activeSection, setActiveSection] = useState<"welcome" | "auth">("welcome");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className={cls.container}>
      <div className={`${cls.welcomeSection} ${activeSection === "welcome" ? cls.activeSection : cls.inactiveSection}`}>
        <div className={cls.welcomeContent}>
          <h2 className={cls.welcomeTitle}>{activeSection === "welcome" ? "С возвращением" : "Уже есть аккаунт?"}</h2>
          {activeSection === "welcome" && <SigninForm />}
          {activeSection === "auth" && (
            <Button theme="outline" onClick={() => setActiveSection("welcome")}>
              Войти в аккаунт
            </Button>
          )}
          <div className={cls.welcomeContentBottom}>
            <label className={cls.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={cls.checkbox}
              />
              <span>Запомнить меня</span>
            </label>
          </div>
        </div>
      </div>
      <div className={`${cls.authSection} ${activeSection === "auth" ? cls.activeSection : cls.inactiveSection}`}>
        <div className={cls.authContent}>
          <h2 className={cls.authTitle}>{activeSection === "auth" ? "Создайте аккаунт" : "Нет аккаунта?"}</h2>
          {activeSection === "auth" && <SignupForm />}
          {activeSection === "welcome" && (
            <Button {...(activeSection === "welcome" && { theme: "outline" })} onClick={() => setActiveSection("auth")}>
              Зарегистрироваться
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
