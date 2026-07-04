import CourseForm from "@/components/courses/CourseForm";
import { toCreateCourseRequest } from "@/mappers/course.mapper";
import type { CreateCourseForm } from "@/schemas/course.schema";
import { useNavigate } from "react-router-dom";
import { useCreateCourse } from "@/hooks/useCreateUser";

export default function CreateCourse() {
  const {
    mutate,
   } = useCreateCourse();

   const navigate= useNavigate();

  const handleCreateCourse = async (values: CreateCourseForm) => {
    const mapperValues = toCreateCourseRequest(values);
    mutate(mapperValues);
    navigate("/dashboard/courses");
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