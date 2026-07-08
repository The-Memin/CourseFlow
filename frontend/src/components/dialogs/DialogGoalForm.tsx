import { DialogForm } from "./DialogForm";
import { GoalForm } from "../goals/GoalForm";

import { type CreateGoalForm, goalSchema } from "@/schemas/goal.schema";

import { useState } from "react";
import { useGoal } from "@/hooks/useGoal";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { emptyGoal } from "@/constants/goal";

interface Props{
    courseId: string
}


export function DialogGoalForm({ courseId }: Props){
    const { addGoalMutation } = useGoal({ courseId });
    const [open, setOpen] = useState(false);
    const form = useForm<CreateGoalForm>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            ...emptyGoal,
        }
    });

    const onSubmitGoal = async (values: CreateGoalForm) => {
        addGoalMutation.mutate(values);
        setOpen(false);
    };

    const { isSubmitting } = form.formState;

    return(
        <FormProvider {...form}>
            <DialogForm
                title="Create Goal"
                description="Complete the goal information."
                textButton="Add goal"
                formId="goal-form"
                isSubmitting={isSubmitting}
                open={open}
                setOpen={setOpen}
            >
                <GoalForm
                    onSubmit={onSubmitGoal}
                />
            </DialogForm>
        </FormProvider>
    );
}