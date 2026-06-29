import type { Course } from "@/types/course";
import { statusConfig } from "@/domain/course/course-status";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../ui/badge";

import {
  calculateCourseProgress,
} from "@/domain/course/course-progress";
import { Link } from "react-router-dom";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const progress = calculateCourseProgress(course);

  const status = statusConfig[course.status];
  return (
    <Link to={`/dashboard/courses/${course.id}`}>
      <Card className="hover:scale-[1.015] transition-all">
        <CardHeader>
          <CardTitle>
            {course.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {course.description}
          </p>

          <div>
            <div className="flex justify-between text-sm">
              <span>
                Progress
              </span>

              <span>
                {progress}%
              </span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <span className="flex gap-5 text-gray-300">{course.goals.length} goals</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}