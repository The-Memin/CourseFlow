import { describe, it, expect } from "vitest";
import { goalSchema } from "./goal.schema";

describe("goalSchema", () => {
  const validGoal = {
    name: "Learn basics",
    description: "Study the fundamentals",
    unit: "TOPICS",
    targetValue: 10,
    priority: "HIGH",
  };

  it("accepts valid goal data", () => {
    expect(goalSchema.safeParse(validGoal).success).toBe(true);
  });

  it("rejects name shorter than 3 characters", () => {
    expect(goalSchema.safeParse({ ...validGoal, name: "ab" }).success).toBe(
      false
    );
  });

  it("rejects description shorter than 3 characters", () => {
    expect(
      goalSchema.safeParse({ ...validGoal, description: "ab" }).success
    ).toBe(false);
  });

  it("rejects invalid unit", () => {
    expect(
      goalSchema.safeParse({ ...validGoal, unit: "INVALID" }).success
    ).toBe(false);
  });

  it("accepts all valid units", () => {
    const units = ["TOPICS", "HOURS", "EXERCISES", "LABS", "PROJECTS"];
    for (const unit of units) {
      expect(goalSchema.safeParse({ ...validGoal, unit }).success).toBe(true);
    }
  });

  it("rejects targetValue less than 1", () => {
    expect(
      goalSchema.safeParse({ ...validGoal, targetValue: 0 }).success
    ).toBe(false);
  });

  it("rejects invalid priority", () => {
    expect(
      goalSchema.safeParse({ ...validGoal, priority: "INVALID" }).success
    ).toBe(false);
  });

  it("accepts all valid priorities", () => {
    const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    for (const priority of priorities) {
      expect(goalSchema.safeParse({ ...validGoal, priority }).success).toBe(
        true
      );
    }
  });
});
