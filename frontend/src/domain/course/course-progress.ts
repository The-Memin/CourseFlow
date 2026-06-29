import type { Course } from "@/types/course";

export function calculateGoalProgress(currentValue: number, targetValue: number): number {
  if (targetValue === 0) return 0;

  return Math.min(
    100,
    Math.round(
      (currentValue / targetValue) * 100
    )
  );
}

export function calculateCourseProgress(course: Course): number {
  if (course.goals.length === 0) {
    return 0;
  }

  const totalProgress =
    course.goals.reduce(
      (acc, goal) =>
        acc +
        calculateGoalProgress(
          goal.currentValue,
          goal.targetValue
        ),
      0
    );

  return Math.round(
    totalProgress / course.goals.length
  );
}

export function formatGoalUnit(unit: string) {
  const labels = {
    TOPICS: "Topics",
    HOURS: "Hours",
    EXERCISES: "Exercises",
    LABS: "Labs",
    PROJECTS: "Projects",
  };

  return labels[unit as keyof typeof labels];
}