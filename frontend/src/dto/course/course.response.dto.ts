import type { GoalResponseDto } from "../goal/goal-response.dto";

export interface CourseResponseDto{
    uuid: string;
    name: string;
    description: string;
    status: string;
    goals: GoalResponseDto[];
    createdAt: string;
    updatedAt: string;
}