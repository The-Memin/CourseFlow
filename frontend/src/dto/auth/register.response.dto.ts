import { type AuthUser } from "@/types/auth";

export interface RegisterResponseDto {
    token: string;
    user: AuthUser;
}