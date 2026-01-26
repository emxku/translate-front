import cls from "./Input.module.scss";
import cn from "classnames";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export const Input = (props: InputProps) => {
  const { className, ...otherProps } = props;
  return <input className={cn(cls.input, className)} {...otherProps} />;
};
