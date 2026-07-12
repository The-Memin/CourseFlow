import { describe, it, expect } from "vitest";
import { priorityConfig } from "./goal-priority";

describe("priorityConfig", () => {
  it("has all four priority levels", () => {
    expect(Object.keys(priorityConfig)).toEqual([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]);
  });

  it("each priority has a label, order, and className", () => {
    for (const key of Object.keys(priorityConfig)) {
      const config = priorityConfig[key as keyof typeof priorityConfig];
      expect(typeof config.label).toBe("string");
      expect(typeof config.order).toBe("number");
      expect(typeof config.className).toBe("string");
    }
  });

  it("orders are sequential from 1", () => {
    expect(priorityConfig.LOW.order).toBe(1);
    expect(priorityConfig.MEDIUM.order).toBe(2);
    expect(priorityConfig.HIGH.order).toBe(3);
    expect(priorityConfig.CRITICAL.order).toBe(4);
  });

  it("has correct labels", () => {
    expect(priorityConfig.LOW.label).toBe("Low");
    expect(priorityConfig.MEDIUM.label).toBe("Medium");
    expect(priorityConfig.HIGH.label).toBe("High");
    expect(priorityConfig.CRITICAL.label).toBe("Critical");
  });
});
