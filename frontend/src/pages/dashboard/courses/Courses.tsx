import { useCourses } from "@/hooks/useCourses";

import CourseCard from "@/components/courses/CourseCard";
import CourseFilters from "@/components/courses/CourseFilters";
import EmptyCourses from "@/components/courses/EmptyCourses";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { useDeleteDialog } from "@/hooks/useDeleteDialog";

export default function Courses() {
  const {
    filteredCourses,
    setSearch,
    setStatus,
    search,
    status,
    isLoading,
    isError,
    deleteCourseMutation
  } = useCourses();

  const { open,
    openDeleteDialog,
    closeDeleteDialog,
    selectedElementId,
    setSelectedElementId
  }  = useDeleteDialog();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading courses.</div>;

  const handleDeleteCourseAction = (courseId: string) => {
    setSelectedElementId(courseId);
    openDeleteDialog();
  };

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
                onDeleteCourseAction={() => handleDeleteCourseAction(course.id)}
              />
            )
          )}
        </div>
      )}
      <DeleteDialog
        title="Delete Course?"
        target="course"
        open={open}
        setOpen={closeDeleteDialog}
        onDelete={() => {
          if (!selectedElementId) return;
          deleteCourseMutation.mutate(selectedElementId);
          closeDeleteDialog();
        }}
      />
    </div>
  );
}