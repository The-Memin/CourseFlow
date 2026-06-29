import type { CreateCourseForm } from "@/schemas/course.schema";
import type { CreateCourseRequest } from "@/dto/course/create-course.request.dto";
import { type CourseResponseDto } from "@/dto/course/course.response.dto";
import type { Course } from "@/types/course";
import type { GoalPriority, GoalUnit } from "@/types/goal";

export function toCreateCourseRequest(form: CreateCourseForm): CreateCourseRequest{
    return {
        name: form.name,
        description: form.description,
        goals: form.goals.map(goal => (
            {
                name: goal.name,
                description: goal.description,
                unit: goal.unit,
                targetValue: goal.targetValue,
                priority: goal.priority
            }
        ))
    };
}

export function mapCourseDtoToCourse(dto: CourseResponseDto): Course{
    return {
    id: dto.uuid,
    name: dto.name,
    description: dto.description,

    status: dto.status as Course["status"],

    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,

    goals: dto.goals.map(goal => ({
        id: goal.id,
        name: goal.name,
        description: goal.description,

        priority: goal.priority as GoalPriority,

        unit: goal.goalUnit as GoalUnit,

        targetValue: goal.targetValue,

        currentValue: goal.currentValue,

        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt
    })),
  };
}