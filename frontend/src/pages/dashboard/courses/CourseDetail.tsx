import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import GoalCard from "@/components/courses/GoalCard";
import { statusConfig } from "@/domain/course/course-status";
import { calculateCourseProgress } from "@/domain/course/course-progress";
import BackButton from "@/components/shared/BackButton";
import { DialogGoalForm } from "@/components/dialogs/DialogGoalForm";

import { Loader2 } from "lucide-react";
import ErrorMessage from "@/components/shared/ErrorMessage";
import NotFound from "@/components/shared/NotFound";
import { useCourse } from "@/hooks/useCourse";
import { useGoal } from "@/hooks/useGoal";
import { useDeleteDialog } from "@/hooks/useDeleteDialog";
import { Ellipsis } from "lucide-react";

import { DropdownButton } from "@/components/shared/DropdownButton";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { course, isLoading, isError } = useCourse(id);
  const { open, openDeleteDialog, closeDeleteDialog, selectedElementId, setSelectedElementId } = useDeleteDialog();
  const { deleteGoalMutation } = useGoal(id);

  if (isLoading) return <Loader2 className="animate-spin mr-2 h-4 w-4"/>;

  if (isError) return <ErrorMessage message="Failed to load course." />;

  if (!course) return <NotFound />;


  const handleDeleteGoalAction = (goalId: string) => {
    setSelectedElementId(goalId);
    openDeleteDialog();
  };

  const progress = calculateCourseProgress(course);
  const status = statusConfig[course.status];

  const sortedGoals = [...course.goals].sort(
                        (a, b) =>
                          new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime()
                      );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <BackButton label="Courses" to="/dashboard/courses"/>

        <DropdownButton onDeleteAction={() => console.log("Delete course")}>
          <Ellipsis />
        </DropdownButton>

      </div>
      <div className="space-y-4">
        <Badge className={status.className}>
          {status.label}
        </Badge>

        <h1 className="text-4xl font-bold">
          {course.name}
        </h1>

        <p className="text-muted-foreground">
          {course.description}
        </p>
      </div>

      <div>
        <div className="flex justify-between">
          <span>
            Overall Progress
          </span>

          <span>
            {progress}%
          </span>
        </div>

        <div className="mt-2 h-3 rounded-full bg-muted">
          <div
            className="h-3 rounded-full bg-primary"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <section>

        <h2 className="text-2xl font-semibold mb-4">
          Goals
        </h2>

        <div
          className="
          grid
          gap-4
          md:grid-cols-2
        "
        >
          {sortedGoals.length > 0 ? (
            sortedGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onDeleteGoalAction={() => handleDeleteGoalAction(goal.id)}
              />
            ))
          ) : (
            <div className="col-span-full rounded-lg border border-dashed bg-muted/30 p-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                🎯
              </div>

              <h3 className="text-lg font-medium">
                No goals yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                This course doesn't have any goals yet. Add one to help define
                what students should achieve.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <DialogGoalForm courseId={course.id}/>
          <DeleteDialog
            title="Delete Goal?"
            target="goal"
            open={open}
            setOpen={closeDeleteDialog}
            onDelete={() => {
              if (!selectedElementId) return;
              deleteGoalMutation.mutate(selectedElementId);
              closeDeleteDialog();
            }}
          />
        </div>
      </section>

    </div>
  );
}