import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, type SigninSchemaType } from "../schema/SigninSchema";
import { useSigninMutation } from "@/api/hooks/useSigninMutation";
import { AxiosError } from "axios";

interface ServerErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

export const useSigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema)
  });

  const { mutate: postSignin, isPending, isError, error: serverError } = useSigninMutation();

  const onSubmit = async (data: SigninSchemaType) => {
    clearErrors(); // Clear previous errors
    postSignin(data);
  };

  // Extract error message directly from backend response
  const errorMessage =
    isError && serverError instanceof AxiosError
      ? (serverError.response?.data as ServerErrorResponse)?.detail ||
        (serverError.response?.data as ServerErrorResponse)?.message ||
        (serverError.response?.data as ServerErrorResponse)?.error ||
        "Произошла ошибка. Попробуйте еще раз"
      : undefined;

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    isError,
    serverError: errorMessage ? { message: errorMessage } : undefined
  };
};
