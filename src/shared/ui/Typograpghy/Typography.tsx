import { type ComponentProps, type HTMLAttributes, type ReactElement, createElement } from "react";
import classNames from "classnames";
import cls from "./Typography.module.scss";

type TypographyStyle = "bold28" | "medium20" | "regular16" | "regular12";

type AllowedElements =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "textarea"
  | "label";

type BaseTypographyProps = {
  styleType?: TypographyStyle;
  className?: string;
};

type TypographyProps<T extends AllowedElements> = BaseTypographyProps & {
  tag: T;
} & ComponentProps<T>;

export function Typography<T extends "textarea">(
  props: TypographyProps<T> & { tag: T } & ComponentProps<"textarea">
) : ReactElement;

export function Typography<T extends "p" | "span" | "div" | "label">(
  props: TypographyProps<T> & { tag: T} & HTMLAttributes<HTMLElement>
): ReactElement;

export function Typography<T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6">(
  props: TypographyProps<T> & { tag: T } & HTMLAttributes<HTMLHeadElement>
): ReactElement;

export function Typography<T extends AllowedElements>({
  tag,
  styleType = "regular16",
  className,
  ...rest
}: TypographyProps<T>): ReactElement {
  return createElement(tag, {
    ...rest,
    className: classNames(cls.typography, styleMapping[styleType as TypographyStyle], className)
  });
}

const styleMapping: Record<TypographyStyle, string> = {
  bold28: cls.bold28,
  medium20: cls.medium20,
  regular16: cls.regular16,
  regular12: cls.regular12
};