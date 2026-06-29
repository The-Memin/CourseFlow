import { AUTH_STORAGE_KEY } from "@/constants/auth";
import type { AuthSession } from "@/types/auth-session";

export function saveSession(session: AuthSession){
    localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(session)
    );
}

export function getSession(): AuthSession | null {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!session) {
        return null;
    }

    return JSON.parse(session);
}

export function clearSession() {
  localStorage.removeItem(
    AUTH_STORAGE_KEY
  );
}