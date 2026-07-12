import { describe, it, expect } from "vitest";
import {
  calculateGoalProgress,
  calculateCourseProgress,
  formatGoalUnit,
} from "./course-progress";
import type { Course } from "@/types/course";

describe("calculateGoalProgress", () => {
  it("returns 0 when targetValue is 0", () => {
    expect(calculateGoalProgress(5, 0)).toBe(0);
  });

  it("returns 0 when currentValue is 0", () => {
    expect(calculateGoalProgress(0, 10)).toBe(0);
  });

  it("returns 100 when currentValue equals targetValue", () => {
    expect(calculateGoalProgress(10, 10)).toBe(100);
  });

  it("calculates partial progress correctly", () => {
    expect(calculateGoalProgress(3, 10)).toBe(30);
  });

  it("caps at 100 when currentValue exceeds targetValue", () => {
    expect(calculateGoalProgress(15, 10)).toBe(100);
  });

  it("rounds to nearest integer", () => {
    expect(calculateGoalProgress(1, 3)).toBe(33);
  });
});

describe("calculateCourseProgress", () => {
  const makeCourse = (goals: Course["goals"]): Course => ({
    id: "1",
    name: "Test",
    description: "",
    status: "IN_PROGRESS",
    goals,
    createdAt: "",
    updatedAt: "",
  });

  it("returns 0 when course has no goals", () => {
    expect(calculateCourseProgress(makeCourse([]))).toBe(0);
  });

  it("returns goal progress when course has one goal", () => {
    const course = makeCourse([
      {
        id: "g1",
        name: "G1",
        description: "",
        unit: "TOPICS",
        priority: "LOW",
        targetValue: 10,
        currentValue: 5,
        createdAt: "",
        updatedAt: "",
      },
    ]);
    expect(calculateCourseProgress(course)).toBe(50);
  });

  it("averages progress across multiple goals", () => {
    const course = makeCourse([
      {
        id: "g1",
        name: "G1",
        description: "",
        unit: "TOPICS",
        priority: "LOW",
        targetValue: 10,
        currentValue: 10,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "g2",
        name: "G2",
        description: "",
        unit: "HOURS",
        priority: "HIGH",
        targetValue: 10,
        currentValue: 0,
        createdAt: "",
        updatedAt: "",
      },
    ]);
    expect(calculateCourseProgress(course)).toBe(50);
  });
});

describe("formatGoalUnit", () => {
  it("formats TOPICS", () => {
    expect(formatGoalUnit("TOPICS")).toBe("Topics");
  });

  it("formats HOURS", () => {
    expect(formatGoalUnit("HOURS")).toBe("Hours");
  });

  it("formats EXERCISES", () => {
    expect(formatGoalUnit("EXERCISES")).toBe("Exercises");
  });

  it("formats LABS", () => {
    expect(formatGoalUnit("LABS")).toBe("Labs");
  });

  it("formats PROJECTS", () => {
    expect(formatGoalUnit("PROJECTS")).toBe("Projects");
  });

  it("returns undefined for unknown unit", () => {
    expect(formatGoalUnit("UNKNOWN")).toBeUndefined();
  });
});
