import { Controller } from "react-hook-form";
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectContent
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { type CreateGoalForm } from "@/schemas/goal.schema";
import { useFormContext } from "react-hook-form";

interface Props{
    onSubmit: (values: CreateGoalForm) => void,
}

export function GoalForm({ onSubmit }: Props){
    const form = useFormContext<CreateGoalForm>();

    return(
        <form id="goal-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Goal Name</label>
                <Input
                    {...form.register(`name`)}
                    placeholder="Goal name"
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                    { form.formState.errors.name?.message }
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Description
                </label>

                <Textarea
                    {...form.register('description')}
                    placeholder="Describe this goal"
                />
                {form.formState.errors.description && (
                    <p className="text-sm text-destructive">
                    {
                        form.formState.errors.description?.message
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
                        'targetValue',
                        {
                            valueAsNumber: true,
                        }
                        )}
                    />
                    {form.formState.errors.targetValue && (
                        <p className="text-sm text-destructive">
                        {
                            form.formState.errors.targetValue?.message
                        }
                        </p>
                    )}
                </div>

                <Controller
                control={form.control}
                name={`unit`}
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
                    name={`priority`}
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
        </form>
    );
}