import type { AuthUser } from "@/types/auth";

export interface LoginResponseDto {
    token: string;
    user: AuthUser
}