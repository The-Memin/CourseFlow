import { createContext } from "react";

import type { AuthUser } from "@/types/auth";
import type { AuthSession } from "@/types/auth-session";


export interface AuthContextType{
    session: AuthSession | null;

    user: AuthUser | null;

    token: string | null;

    isAuthenticated: boolean;

    login: (email: string, password: string) => Promise<void>;

    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null);