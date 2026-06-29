export default function EmptyCourses() {
  return (
    <div className="rounded-lg border p-10 text-center">
      <h3 className="text-lg font-semibold">
        No courses found
      </h3>

      <p className="text-muted-foreground mt-2">
        Try changing the filters.
      </p>
    </div>
  );
}