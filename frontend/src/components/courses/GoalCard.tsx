import type { Goal } from "@/types/course";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../ui/badge";

import { goalUnitLabels } from "@/domain/goal/goal-unit";
import { calculateGoalProgress } from "@/domain/course/course-progress";
import { priorityConfig } from "@/domain/goal/goal-priority";

interface Props {
  goal: Goal;
}

export default function GoalCard({ goal }: Props) {
    const progress = calculateGoalProgress(goal.currentValue, goal.targetValue);
    const priority = priorityConfig[goal.priority];

    return (
        <Card>
        <CardHeader>
            <CardTitle>
            {goal.name}
            </CardTitle>
            <Badge className={priority.className}>
                {priority.label}
            </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
            {goal.description}
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

            <p className="text-sm">
            {goal.currentValue}
            {" / "}
            {goal.targetValue}
            {" "}
            {goalUnitLabels[goal.unit]}
            </p>
        </CardContent>
        </Card>
    );
}