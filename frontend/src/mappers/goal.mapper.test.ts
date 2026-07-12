import { describe, it, expect } from "vitest";
import { toCreateGoalRequest } from "./goal.mapper";
import type { CreateGoalForm } from "@/schemas/goal.schema";

describe("toCreateGoalRequest", () => {
  it("maps form data and courseUuid to createGoalRequestDto", () => {
    const form: CreateGoalForm = {
      name: "My Goal",
      description: "Goal description",
      unit: "HOURS",
      targetValue: 15,
      priority: "CRITICAL",
    };

    const result = toCreateGoalRequest(form, "course-uuid-123");

    expect(result.name).toBe("My Goal");
    expect(result.description).toBe("Goal description");
    expect(result.goalUnit).toBe("HOURS");
    expect(result.targetValue).toBe(15);
    expect(result.priority).toBe("CRITICAL");
    expect(result.currentValue).toBe(0);
    expect(result.courseUuid).toBe("course-uuid-123");
  });

  it("always sets currentValue to 0", () => {
    const form: CreateGoalForm = {
      name: "Goal",
      description: "Desc",
      unit: "TOPICS",
      targetValue: 5,
      priority: "LOW",
    };

    expect(toCreateGoalRequest(form, "any-id").currentValue).toBe(0);
  });
});
