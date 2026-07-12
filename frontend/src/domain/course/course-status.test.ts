import { describe, it, expect } from "vitest";
import { statusConfig } from "./course-status";

describe("statusConfig", () => {
  it("has all four course statuses", () => {
    expect(Object.keys(statusConfig)).toEqual([
      "NOT_STARTED",
      "IN_PROGRESS",
      "COMPLETED",
      "PAUSED",
    ]);
  });

  it("each status has a label and className", () => {
    for (const key of Object.keys(statusConfig)) {
      const config = statusConfig[key as keyof typeof statusConfig];
      expect(typeof config.label).toBe("string");
      expect(config.label.length).toBeGreaterThan(0);
      expect(typeof config.className).toBe("string");
      expect(config.className.length).toBeGreaterThan(0);
    }
  });

  it("has correct labels", () => {
    expect(statusConfig.NOT_STARTED.label).toBe("Not Started");
    expect(statusConfig.IN_PROGRESS.label).toBe("In Progress");
    expect(statusConfig.COMPLETED.label).toBe("Completed");
    expect(statusConfig.PAUSED.label).toBe("Paused");
  });
});
