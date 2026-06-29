import { useEffect, useMemo, useState } from "react";

import CourseCard from "@/components/courses/CourseCard";
import CourseFilters from "@/components/courses/CourseFilters";
import EmptyCourses from "@/components/courses/EmptyCourses";

import { courseService } from "@/services/course.service";
import { type Course } from "@/types/course";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function getCourses() {
      const data = await courseService.getCourses();
      console.log(data);
      setCourses(data);
    }
    getCourses();

  }, []);


  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      	const matchesSearch = course.name
          						.toLowerCase()
          						.includes(search.toLowerCase());

      	const matchesStatus = status === "ALL"
          						? true
          						: course.status === status;

      return (matchesSearch && matchesStatus);
    });
  }, [search, status, courses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Courses
        </h1>

        <p className="text-muted-foreground">
          Manage your learning paths.
        </p>
      </div>

      <CourseFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {filteredCourses.length === 0 ? (
        <EmptyCourses />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map(
            (course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}