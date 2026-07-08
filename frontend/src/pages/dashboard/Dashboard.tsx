import StatsCard from "@/components/dashboard/StatsCard";
import CourseCard from "@/components/courses/CourseCard";


import { useCourses } from "@/hooks/useCourses";

export default function Dashboard() {
  const {
    isLoading,
    isError,
    stats,
    courses
  } = useCourses();


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Error loading courses. Please try again later.</p>
      </div>
    );
  }

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
          value={stats.total}
        />

        <StatsCard
          title="Active Courses"
          value={stats.active}
        />

        <StatsCard
          title="Completed"
          value={stats.completed}
        />

        <StatsCard
          title="Average Progress"
          value={`${stats.average}%`}
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