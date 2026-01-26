import { api } from "@/shared/config/api/axiosInstanse";

export const postSignin = async (data: Signin) => api.post<Tokens>("auth/signin", data);
