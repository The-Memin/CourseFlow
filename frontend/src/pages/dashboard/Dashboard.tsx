import StatsCard from "@/components/dashboard/StatsCard";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses } from "@/mocks/courses";

import { calculateCourseProgress } from "@/domain/course/course-progress";

export default function Dashboard() {
  const totalCourses = mockCourses.length;
  const activeCourses = mockCourses.filter((c) => c.status === "IN_PROGRESS").length;
  const completedCourses = mockCourses.filter((c) => c.status === "COMPLETED").length;

  const averageProgress = Math.round(
        mockCourses.reduce((acc, course) =>
          acc + calculateCourseProgress(course)
        , 0
      ) / totalCourses
    );

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
          value={totalCourses}
        />

        <StatsCard
          title="Active Courses"
          value={activeCourses}
        />

        <StatsCard
          title="Completed"
          value={completedCourses}
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
          {mockCourses.slice(0, 3).map((course) => (
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