import type { GoalPriority, GoalUnit } from "@/types/goal";

export interface CreateGoalRequest{
    name: string,
    description:string,
    unit: GoalUnit,
    targetValue: number,
    priority: GoalPriority
}

export interface CreateCourseRequest {
    name: string;
    description: string;
    goals: CreateGoalRequest[]
}