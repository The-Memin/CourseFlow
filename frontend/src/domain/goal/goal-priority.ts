import type { GoalPriority } from "@/types/goal";

export const priorityConfig: Record<GoalPriority, { label: string; order: number; className: string; }> = {
  LOW: {
    label: "Low",
    order: 1,
    className: "bg-slate-500 text-white",
  },

  MEDIUM: {
    label: "Medium",
    order: 2,
    className: "bg-yellow-500 text-black",
  },

  HIGH: {
    label: "High",
    order: 3,
    className: "bg-orange-500 text-white",
  },

  CRITICAL: {
    label: "Critical",
    order: 4,
    className: "bg-red-500 text-white",
  },
};