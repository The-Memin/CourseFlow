import type { GoalPriority, GoalUnit } from "@/types/goal";

interface GoalForm{
    name: string;
    description: string;
    unit: GoalUnit;
    targetValue: number;
    priority: GoalPriority
}

export const emptyGoal: GoalForm = {
  name: "",
  description: "",
  unit: "TOPICS",
  targetValue: 1,
  priority: "MEDIUM",
};