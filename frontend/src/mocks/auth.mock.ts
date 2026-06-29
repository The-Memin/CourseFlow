import type { LoginRequest } from "@/dto/auth/login.request.dto";
import type { LoginResponse } from "@/dto/auth/login.response.dto";

const delay = (ms: number) => (new Promise(resolve => setTimeout(resolve, ms)));

export async function loginMock(request: LoginRequest): Promise<LoginResponse> {
    await delay(1500);

    return {
        accessToken: "mock-jwt-token",
        user: {
            id: "1",
            name: "Guillermo",
            email: request.email
        }
    };
}