import { api } from "@/shared/config/api/axiosInstanse";

export const postRefresh = async () => api.post<Tokens>("auth/refresh");
