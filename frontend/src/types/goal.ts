export type GoalUnit =
    | "TOPICS"
    | "HOURS"
    | "EXERCISES"
    | "LABS"
    | "PROJECTS"

export interface Goal {
    id: string,
    name: string,
    description: string,
    unit: GoalUnit,
    priority: GoalPriority,
    targetValue: number,
    currentValue: number

    createdAt: string;
    updatedAt: string;
}

export type GoalPriority =
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"