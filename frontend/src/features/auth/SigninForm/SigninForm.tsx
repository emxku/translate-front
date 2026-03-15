import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import cls from "./SigninForm.module.scss";
import { useSigninForm } from "./hooks/useSigninForm";

export const SigninForm = () => {
  const { register, handleSubmit, errors, onSubmit, isPending, isError, serverError } = useSigninForm();

  return (
    <form className={cls.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={cls.formGroup}>
        <Input
          {...register("username")}
          placeholder="Логин"
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
      {isError && serverError?.message && (
        <div className={cls.serverError} role="alert" aria-live="polite">
          <p className={cls.serverErrorMessage}>{serverError.message}</p>
        </div>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
};
