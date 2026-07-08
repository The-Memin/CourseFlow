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
        const response = await axios.get(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders() });
        return response.data;
    }

    async post<T>(endpoint: string, data: any): Promise<T>{
        const response = await axios.post(`${this.baseUrl}${endpoint}`, data, { headers: this.getHeaders() });
        return response.data;
    }

    async delete<T>(endpoint: string): Promise<T>{
        const response = await axios.delete(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders() });
        return response.data;
    }
}

export const apiClient = new ApiClient();