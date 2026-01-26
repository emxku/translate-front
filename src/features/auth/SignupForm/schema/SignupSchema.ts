import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(3, "Минимальная длина 3 символа").max(20, "Максимальная длина 20 символов"),
    password: z.string().min(8, "Минимальная длина 8 символов").max(25, "Максимальная длина 25 символов"),
    repeat_password: z.string().min(8, "Минимальная длина 8 символов").max(25, "Максимальная длина 25 символов")
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Пароли не совпадают",
    path: ["repeat_password"]
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
