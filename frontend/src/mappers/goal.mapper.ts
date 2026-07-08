import type { createGoalRequestDto } from "@/dto/goal/goal-request.dto";
import type { CreateGoalForm } from "@/schemas/goal.schema";

export function toCreateGoalRequest(form: CreateGoalForm, courseUuid: string): createGoalRequestDto{
    return {
        name: form.name,
        description: form.description,
        goalUnit: form.unit,
        targetValue: form.targetValue,
        priority: form.priority,
        currentValue: 0,
        courseUuid
    };
}