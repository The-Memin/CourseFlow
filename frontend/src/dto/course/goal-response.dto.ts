
export interface GoalResponseDto{
    id: string;
    name: string;
    description: string;

    priority: string;

    goalUnit: string;

    targetValue: number;
    currentValue: number;

    createdAt: string,
    updatedAt: string
}