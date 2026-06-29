import type { AuthUser } from "./auth";

export interface AuthSession {
    token: string;
    user: AuthUser
}