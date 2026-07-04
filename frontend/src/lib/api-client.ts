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
        console.log("API GET Response:", response.data); // Log the response data
        return response.data;
    }

    async post<T>(endpoint: string, data: any): Promise<T>{
        console.log(data);
        const response = await axios.post(`${this.baseUrl}${endpoint}`, data, { headers: this.getHeaders() });
        return response.data;
    }
}

export const apiClient = new ApiClient();