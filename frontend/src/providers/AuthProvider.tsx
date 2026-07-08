import { useState, type ReactNode } from "react";
import { AuthContext } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import {
    getSession,
    saveSession,
    clearSession
} from "@/lib/auth-storage";
import type { AuthSession } from "@/types/auth-session";


import { type RegisterResponseDto } from "@/dto/auth/register.response.dto";
import { type LoginResponseDto } from "@/dto/auth/login.response.dto";

interface AuthProviderProps{
    children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<AuthSession | null>(() => getSession());

    const setAuthenticatedSession = (response: RegisterResponseDto | LoginResponseDto) => {
        const session = {
            token: response.token,
            user: response.user
        };
        saveSession(session);
        setSession(session);
    };

    const login = async(email: string, password: string) => {
        const response = await authService.login({ email, password });
        setAuthenticatedSession(response);
    };

    const register = async(name: string, email: string, password: string) => {
        const response = await authService.register({ name, email, password });
        setAuthenticatedSession(response);
    };

    const logout = () => {
        clearSession();
        setSession(null);
    };

    return(
        <AuthContext.Provider
        value={{
                session,
                user: session?.user ?? null,
                token: session?.token ?? null,
                isAuthenticated: !!session,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}