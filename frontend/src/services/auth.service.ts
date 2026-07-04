import type { LoginRequest } from "@/dto/auth/login.request.dto";
import type { LoginResponseDto } from "@/dto/auth/login.response.dto";
import type { RegisterRequest } from "@/dto/auth/register.request.dto";
import type { RegisterResponseDto } from "@/dto/auth/register.response.dto";

import { apiClient } from "@/lib/api-client";


class AuthService {
    async login(request: LoginRequest){
        const response: LoginResponseDto = await apiClient.post<LoginResponseDto>("/auth/login", request);
        return response;
    }

    async register(request: RegisterRequest){
        const response: RegisterResponseDto = await apiClient.post<RegisterResponseDto>("/auth/register", request);
        return response;
    }
}

export const authService = new AuthService();