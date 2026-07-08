import { useCourses } from "@/hooks/useCourses";

import CourseCard from "@/components/courses/CourseCard";
import CourseFilters from "@/components/courses/CourseFilters";
import EmptyCourses from "@/components/courses/EmptyCourses";

export default function Courses() {
  const {
    filteredCourses,
    setSearch,
    setStatus,
    search,
    status,
    isLoading,
    isError,
  } = useCourses();


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading courses.</div>;



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