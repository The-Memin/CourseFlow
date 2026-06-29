import type { AuthUser } from "@/types/auth";

export interface LoginResponse {
    accessToken: string;
    user: AuthUser
}