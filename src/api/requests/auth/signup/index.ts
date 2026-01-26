import { api } from "@/shared/config/api/axiosInstanse";

export const postSignup = async (data: Signup) => api.post<Tokens>("auth/signup", data);
