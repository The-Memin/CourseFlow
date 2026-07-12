import { useQueryClient, useMutation } from "@tanstack/react-query";
import { goalService } from "@/services/goal.service";
import type { CreateGoalForm } from "@/schemas/goal.schema";

import { toCreateGoalRequest } from "@/mappers/goal.mapper";

export function useGoal(courseId?:string) {
    const queryClient = useQueryClient();

    const deleteGoalMutation = useMutation({
        mutationFn: (goalId: string) => goalService.deleteGoal({ goalId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", courseId] });
        }
    });

    const addGoalMutation = useMutation({
        mutationFn: (newGoal: CreateGoalForm) => goalService.createGoal(toCreateGoalRequest(newGoal, courseId!)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", courseId] });
        }
    });

    return {
        deleteGoalMutation,
        addGoalMutation
    };
}