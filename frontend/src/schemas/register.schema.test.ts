import { describe, it, expect } from "vitest";
import { registerSchema } from "./register.schema";

const validData = {
  name: "John",
  email: "john@example.com",
  password: "123456",
  confirmPassword: "123456",
};

describe("registerSchema", () => {
  it("accepts valid registration data", () => {
    expect(registerSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = registerSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({ ...validData, email: "bad" });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "123",
      confirmPassword: "123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when passwords do not match", () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: "654321",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing confirmPassword", () => {
    const { confirmPassword, ...rest } = validData;
    expect(registerSchema.safeParse(rest).success).toBe(false);
  });
});
