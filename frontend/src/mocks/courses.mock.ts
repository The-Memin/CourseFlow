import type { CreateCourseForm } from "@/schemas/course.schema";

const delay = (ms: number) =>  new Promise(resolve =>
    setTimeout(resolve, ms)
);

export async function createCourseMock(course: CreateCourseForm) {
  await delay(2000);

  console.log(
    "Mock Course Created:",
    course
  );

  return {
    success: true,
    id: crypto.randomUUID(),
  };
}