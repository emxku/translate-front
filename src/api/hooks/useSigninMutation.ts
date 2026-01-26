import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postSignin } from "../requests/auth/signin";
import { AppRoutes, RoutePath } from "@/shared/config/router/routePath";

export const useSigninMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Signin) => postSignin(data),
    mutationKey: ["signin"],
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
