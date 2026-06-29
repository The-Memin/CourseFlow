import CourseForm from "@/components/courses/CourseForm";
import { toCreateCourseRequest } from "@/mappers/course.mapper";
import type { CreateCourseForm } from "@/schemas/course.schema";
import { courseService } from "@/services/course.service";

export default function CreateCourse() {
  const handleCreateCourse = async (values: CreateCourseForm) => {
    const mapperValues = toCreateCourseRequest(values);
    const result = await courseService.create(mapperValues);
  };

  return (
    <div className="w-10/12 m-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          New Course
        </h1>

        <p className="text-muted-foreground">
          Add a new Course
        </p>
      </div>
      <CourseForm onSubmit={handleCreateCourse} />
    </div>
  );
}