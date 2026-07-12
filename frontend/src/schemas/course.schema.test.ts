import { describe, it, expect } from "vitest";
import { createCourseSchema } from "./course.schema";

describe("createCourseSchema", () => {
  const validCourse = {
    name: "My Course",
    description: "A course description",
    goals: [
      {
        name: "Goal 1",
        description: "Goal description",
        unit: "TOPICS",
        targetValue: 10,
        priority: "HIGH",
      },
    ],
  };

  it("accepts valid course data", () => {
    expect(createCourseSchema.safeParse(validCourse).success).toBe(true);
  });

  it("rejects name shorter than 3 characters", () => {
    expect(
      createCourseSchema.safeParse({ ...validCourse, name: "ab" }).success
    ).toBe(false);
  });

  it("rejects description shorter than 10 characters", () => {
    expect(
      createCourseSchema.safeParse({
        ...validCourse,
        description: "short",
      }).success
    ).toBe(false);
  });

  it("rejects empty goals array", () => {
    expect(
      createCourseSchema.safeParse({ ...validCourse, goals: [] }).success
    ).toBe(false);
  });

  it("accepts multiple goals", () => {
    const course = {
      ...validCourse,
      goals: [...validCourse.goals, { ...validCourse.goals[0], name: "Goal 2" }],
    };
    expect(createCourseSchema.safeParse(course).success).toBe(true);
  });

  it("rejects invalid goal inside goals array", () => {
    const course = {
      ...validCourse,
      goals: [{ ...validCourse.goals[0], unit: "INVALID" }],
    };
    expect(createCourseSchema.safeParse(course).success).toBe(false);
  });
});
