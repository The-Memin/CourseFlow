import { describe, it, expect } from "vitest";
import { toCreateCourseRequest, mapCourseDtoToCourse } from "./course.mapper";
import type { CreateCourseForm } from "@/schemas/course.schema";
import type { CourseResponseDto } from "@/dto/course/course.response.dto";

describe("toCreateCourseRequest", () => {
  it("maps form data to CreateCourseRequest", () => {
    const form: CreateCourseForm = {
      name: "Course Name",
      description: "Course Description",
      goals: [
        {
          name: "Goal 1",
          description: "Goal Desc",
          unit: "TOPICS",
          targetValue: 20,
          priority: "HIGH",
        },
        {
          name: "Goal 2",
          description: "Goal Desc 2",
          unit: "HOURS",
          targetValue: 5,
          priority: "LOW",
        },
      ],
    };

    const result = toCreateCourseRequest(form);

    expect(result.name).toBe("Course Name");
    expect(result.description).toBe("Course Description");
    expect(result.goals).toHaveLength(2);
    expect(result.goals[0]).toEqual({
      name: "Goal 1",
      description: "Goal Desc",
      goalUnit: "TOPICS",
      targetValue: 20,
      priority: "HIGH",
    });
    expect(result.goals[1].goalUnit).toBe("HOURS");
  });

  it("handles empty goals array", () => {
    const form: CreateCourseForm = {
      name: "Course",
      description: "Description here",
      goals: [],
    };
    expect(toCreateCourseRequest(form).goals).toEqual([]);
  });
});

describe("mapCourseDtoToCourse", () => {
  it("maps CourseResponseDto to Course domain model", () => {
    const dto: CourseResponseDto = {
      uuid: "uuid-123",
      name: "Test Course",
      description: "Test Desc",
      status: "IN_PROGRESS",
      goals: [
        {
          uuid: "goal-uuid-1",
          name: "Goal A",
          description: "Goal Desc A",
          priority: "MEDIUM",
          goalUnit: "EXERCISES",
          targetValue: 30,
          currentValue: 10,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-02",
        },
      ],
      createdAt: "2025-01-01",
      updatedAt: "2025-01-02",
    };

    const result = mapCourseDtoToCourse(dto);

    expect(result.id).toBe("uuid-123");
    expect(result.name).toBe("Test Course");
    expect(result.description).toBe("Test Desc");
    expect(result.status).toBe("IN_PROGRESS");
    expect(result.createdAt).toBe("2025-01-01");
    expect(result.goals).toHaveLength(1);
    expect(result.goals[0].id).toBe("goal-uuid-1");
    expect(result.goals[0].unit).toBe("EXERCISES");
    expect(result.goals[0].priority).toBe("MEDIUM");
    expect(result.goals[0].currentValue).toBe(10);
  });

  it("handles empty goals array", () => {
    const dto: CourseResponseDto = {
      uuid: "uuid-456",
      name: "Empty",
      description: "",
      status: "NOT_STARTED",
      goals: [],
      createdAt: "",
      updatedAt: "",
    };

    const result = mapCourseDtoToCourse(dto);
    expect(result.goals).toEqual([]);
  });
});
