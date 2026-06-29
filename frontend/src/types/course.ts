import { type Goal } from "./goal";

export type CourseStatus =
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "PAUSED"

export interface Course {
  id: string;
  name: string;
  description: string;
  status: CourseStatus;

  goals: Goal[];

  createdAt: string;
  updatedAt: string;
}