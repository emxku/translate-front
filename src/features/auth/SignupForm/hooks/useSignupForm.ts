import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupSchemaType } from "../schema/SignupSchema";
import { useSignupMutation } from "@/api/hooks/useSignupMutation";
import { AxiosError } from "axios";

interface ServerErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

export const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema)
  });

  const { mutate: postSignup, isPending, isError, error: serverError } = useSignupMutation();

  const onSubmit = async (data: SignupSchemaType) => {
    clearErrors(); // Clear previous errors
    postSignup(data);
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
