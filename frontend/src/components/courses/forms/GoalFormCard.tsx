import { useFormContext } from "react-hook-form";
import type { CreateCourseForm } from "@/schemas/course.schema";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface GoalFormCardProps {
  index: number;
  remove: (index: number) => void;
}

export default function GoalFormCard({ index, remove }: GoalFormCardProps) {
    const form = useFormContext<CreateCourseForm>();
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                Goal #{index + 1}
                </CardTitle>
                {
                    index !== 0 &&
                    <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    type="button"
                    className="cursor-pointer"
                    >
                    <Trash2 />
                    </Button>
                }
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Goal Name</label>
                    <Input
                        {...form.register(
                            `goals.${index}.name`
                        )}
                        placeholder="Goal name"
                    />
                    {form.formState.errors.goals?.[index]?.name && (
                        <p className="text-sm text-destructive">
                        {
                            form.formState.errors.goals?.[index]?.name?.message
                        }
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Description
                    </label>

                    <Textarea
                        {...form.register(
                        `goals.${index}.description`
                        )}
                        placeholder="Describe this goal"
                    />
                    {form.formState.errors.goals?.[index]?.description && (
                        <p className="text-sm text-destructive">
                        {
                            form.formState.errors.goals?.[index]?.description?.message
                        }
                        </p>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Target Value
                        </label>

                        <Input
                            type="number"
                            {...form.register(
                            `goals.${index}.targetValue`,
                            {
                                valueAsNumber: true,
                            }
                            )}
                        />
                        {form.formState.errors.goals?.[index]?.targetValue && (
                            <p className="text-sm text-destructive">
                            {
                                form.formState.errors.goals?.[index]?.targetValue?.message
                            }
                            </p>
                        )}
                    </div>

                    <Controller
                    control={form.control}
                    name={`goals.${index}.unit`}
                    render={({ field }) => (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Unit
                            </label>

                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="TOPICS">
                                        Topics
                                    </SelectItem>

                                    <SelectItem value="HOURS">
                                        Hours
                                    </SelectItem>

                                    <SelectItem value="EXERCISES">
                                        Exercises
                                    </SelectItem>

                                    <SelectItem value="LABS">
                                        Labs
                                    </SelectItem>

                                    <SelectItem value="PROJECTS">
                                        Projects
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    />

                    <Controller
                        control={form.control}
                        name={`goals.${index}.priority`}
                        render={({ field }) => (
                            <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Priority
                            </label>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger  className="w-full">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="LOW">
                                        Low
                                    </SelectItem>

                                    <SelectItem value="MEDIUM">
                                        Medium
                                    </SelectItem>

                                    <SelectItem value="HIGH">
                                        High
                                    </SelectItem>

                                    <SelectItem value="CRITICAL">
                                        Critical
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
}