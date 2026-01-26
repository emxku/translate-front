import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../requests/auth/signup";
import { AppRoutes, RoutePath } from "@/shared/config/router/routePath";

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Signup) => postSignup(data),
    mutationKey: ["signup"],
    onSuccess: () => {
      // const tokens = response.data;

      // // Store tokens in localStorage
      // if (tokens.access_token) {
      //   localStorage.setItem("access_token", tokens.access_token);
      // }
      // if (tokens.refresh_token) {
      //   localStorage.setItem("refresh_token", tokens.refresh_token);
      // }

      // Navigate to profile page
      navigate(RoutePath[AppRoutes.PROFILE]);
    }
  });
};
