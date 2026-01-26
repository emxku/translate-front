import type { ComponentProps } from "react";
import cls from "./Button.module.scss";
import cn from "classnames";

type ButtonTheme = "regular" | "outline";

type ButtonProps = ComponentProps<"button"> & {
  theme?: ButtonTheme;
};

export const Button = (props: ButtonProps) => {
  const { className, children, theme = "regular", ...otherProps } = props;
  return (
    <button className={cn(cls.button, className, cls[theme])} {...otherProps}>
      {children}
    </button>
  );
};
