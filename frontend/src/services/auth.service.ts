import { loginMock } from "@/mocks/auth.mock";

import type { LoginRequest } from "@/dto/auth/login.request.dto";

class AuthService {
    async login(request: LoginRequest){
        return loginMock(request);
    }
}

export const authService = new AuthService();