import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import GoalCard from "@/components/courses/GoalCard";
import { mockCourses } from "@/mocks/courses";
import { statusConfig } from "@/domain/course/course-status";
import { calculateCourseProgress } from "@/domain/course/course-progress";
import BackButton from "@/components/shared/BackButton";
import { priorityConfig } from "@/domain/goal/goal-priority";

export default function CourseDetail() {
  const { id } = useParams();
  const course = mockCourses.find((course) => course.id === id);

  if (!course) {
    return (
      <h1>
        Course not found
      </h1>
    );
  }

  const progress = calculateCourseProgress(course);
  const status = statusConfig[course.status];

  const sortedGoals = [...course.goals].sort(
                        (a, b) =>
                          priorityConfig[b.priority].order -
                          priorityConfig[a.priority].order
                      );

  return (
    <div className="space-y-8">
      <div>
        <BackButton label="Courses" to="/dashboard/courses"/>
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
          {sortedGoals.map(
            (goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
}