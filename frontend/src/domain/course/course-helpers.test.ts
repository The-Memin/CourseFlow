import { describe, it, expect } from "vitest";
import { findCourseById } from "./course-helpers";
import type { Course } from "@/types/course";

const mockCourses: Course[] = [
  {
    id: "abc-1",
    name: "Course 1",
    description: "Desc 1",
    status: "IN_PROGRESS",
    goals: [],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "abc-2",
    name: "Course 2",
    description: "Desc 2",
    status: "COMPLETED",
    goals: [],
    createdAt: "",
    updatedAt: "",
  },
];

describe("findCourseById", () => {
  it("returns the course when id matches", () => {
    const result = findCourseById(mockCourses, "abc-1");
    expect(result).toBeDefined();
    expect(result?.name).toBe("Course 1");
  });

  it("returns undefined when id does not match", () => {
    expect(findCourseById(mockCourses, "not-found")).toBeUndefined();
  });

  it("returns undefined for empty array", () => {
    expect(findCourseById([], "abc-1")).toBeUndefined();
  });
});
