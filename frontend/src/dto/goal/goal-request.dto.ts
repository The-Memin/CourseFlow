import type { GoalPriority, GoalUnit } from "@/types/goal";

export interface deleteGoalRequestDto{
    goalId: string;
}

export interface createGoalRequestDto{
    name: string;
    description: string;

    goalUnit: GoalUnit;
    priority: GoalPriority;

    targetValue: number;
    currentValue: number;

    courseUuid: string
}