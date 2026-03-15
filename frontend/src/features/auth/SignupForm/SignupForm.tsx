import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import cls from "./SignupForm.module.scss";
import { useSignupForm } from "./hooks/useSignupForm";

export const SignupForm = () => {
  const { register, handleSubmit, errors, onSubmit, isPending, isError, serverError } = useSignupForm();

  return (
    <form className={cls.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={cls.formGroup}>
        <Input
          {...register("username")}
          placeholder="Имя пользователя"
          aria-invalid={errors.username ? "true" : "false"}
          aria-describedby={errors.username ? "username-error" : undefined}
        />
        {errors.username && (
          <p id="username-error" className={cls.error} role="alert">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className={cls.formGroup}>
        <Input
          {...register("password")}
          placeholder="Пароль"
          type="password"
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" className={cls.error} role="alert">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className={cls.formGroup}>
        <Input
          {...register("repeat_password")}
          placeholder="Повторите пароль"
          type="password"
          aria-invalid={errors.repeat_password ? "true" : "false"}
          aria-describedby={errors.repeat_password ? "repeat_password-error" : undefined}
        />
        {errors.repeat_password && (
          <p id="repeat_password-error" className={cls.error} role="alert">
            {errors.repeat_password.message}
          </p>
        )}
      </div>
      {isError && serverError?.message && (
        <div className={cls.serverError} role="alert" aria-live="polite">
          <p className={cls.serverErrorMessage}>{serverError.message}</p>
        </div>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Регистрация..." : "Регистрация"}
      </Button>
    </form>
  );
};
