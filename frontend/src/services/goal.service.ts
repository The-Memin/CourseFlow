import { apiClient } from "@/lib/api-client";
import { type createGoalRequestDto, type deleteGoalRequestDto } from "@/dto/goal/goal-request.dto";

class GoalService{
    async createGoal(request: createGoalRequestDto){
        const response = await apiClient.post(`/goals`, request);
        return response;
    }

    async deleteGoal(request: deleteGoalRequestDto){
        const response = await apiClient.delete(`/goals/${request.goalId}`);
        return response;
    }
}

export const goalService = new GoalService();