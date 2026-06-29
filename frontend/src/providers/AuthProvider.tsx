import { useState, type ReactNode } from "react";
import { AuthContext } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import {
    getSession,
    saveSession,
    clearSession
} from "@/lib/auth-storage";
import type { AuthSession } from "@/types/auth-session";


interface AuthProviderProps{
    children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<AuthSession | null>(() => getSession());

    const login = async(email: string, password: string) => {
        const response = await authService.login({ email, password });

        const session = {
            token: response.accessToken,
            user: response.user
        };
        saveSession(session);

        setSession(session);
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
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}