import { env } from "@/config/env";
import { getSession } from "./auth-storage";
import axios from "axios";

//TODO:
//return apliClient.post(...)

export class ApiClient{
    private baseUrl = env.apiUrl;

    private getHeaders(){
        const session = getSession();

        return {
            "Content-Type": "application/json",
            ...(session?.token && {
                Authorization: `Bearer ${session.token}`
            })
        };
    }

    async get<T>(endpoint: string): Promise<T>{
        const response = await axios.get(`${this.baseUrl}${endpoint}`, { ...this.getHeaders });
        return response.data;
    }
}

export const apiClient = new ApiClient();