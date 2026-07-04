import StatsCard from "@/components/dashboard/StatsCard";
import CourseCard from "@/components/courses/CourseCard";

import { calculateCourseProgress } from "@/domain/course/course-progress";

import { courseService } from "@/services/course.service";
import { useEffect, useState } from "react";
import type { Course } from "@/types/course";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await courseService.getCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);


  const averageProgress = courses.length > 0 ? Math.round(
    courses.reduce((acc, course) =>
      acc + calculateCourseProgress(course)
    , 0
  ) / courses.length) : 0;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </section>

      <section
        className="
        grid
        gap-4
        md:grid-cols-2
        lg:grid-cols-4
      "
      >
        <StatsCard
          title="Total Courses"
          value={courses.length}
        />

        <StatsCard
          title="Active Courses"
          value={courses.filter((c) => c.status === "IN_PROGRESS").length}
        />

        <StatsCard
          title="Completed"
          value={courses.filter((c) => c.status === "COMPLETED").length}
        />

        <StatsCard
          title="Average Progress"
          value={`${averageProgress}%`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Recent Courses
        </h2>

        <div
          className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
        >
          {courses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </section>
    </div>
  );
}