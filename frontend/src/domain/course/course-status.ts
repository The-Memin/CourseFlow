import type { CourseStatus } from "@/types/course";

export const statusConfig: Record<CourseStatus, { label: string; className: string; }> = {
  NOT_STARTED: {
    label: "Not Started",
    className:
      "bg-slate-500 text-white",
  },

  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-blue-500 text-white",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-500 text-white",
  },

  PAUSED: {
    label: "Paused",
    className:
      "bg-yellow-500 text-black",
  },
};