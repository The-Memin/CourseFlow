import { type CreateCourseForm, createCourseSchema } from "@/schemas/course.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emptyGoal } from "@/constants/goal";
import { FormProvider, useFieldArray } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import GoalFormCard from "@/components/courses/forms/GoalFormCard";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

interface CourseFormProps {
    onSubmit: (values: CreateCourseForm) => Promise<void>
}

export default function CourseForm({ onSubmit }: CourseFormProps){
    const form = useForm<CreateCourseForm>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
          name: "",
          description: "",
          goals: [{ ...emptyGoal }]
        }
      });

    const { isSubmitting, errors } = form.formState;

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control: form.control,
        name: "goals"
    });

    const handleFormSubmit = async (values: CreateCourseForm) => {
      try{
        await onSubmit(values);
        form.reset({
          name: "",
          description: "",
          goals: [{ ...emptyGoal }],
        });
        toast.success("Course created successfully");
      }catch{
        toast.error("Failed to create course");
      }
    };

    // Codigo para el correcto funcionamiento del componente
    // Queda pendiente la resolucion del bug que causa que se tenga que usar una funcion que re-renderice el componente
    // Para que se sincronice RHF y tanto visualmente como internamnete funcione bien
    // Posiblemente es un detalle al hacer el reset, de alguna forma se pierden la referencias
    const name = form.watch("name");
    void name;

    return(
    <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Course Name
              </label>

              <Input
                {...form.register("name")}
                placeholder="Course Name"
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {
                    errors.name.message
                  }
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>

              <Textarea
                {...form.register("description")}
                placeholder="Description"
              />

              {errors.description && (
                <p className="text-sm text-destructive">
                  {
                    errors.description.message
                  }
                </p>
              )}
            </div>

            <Separator/>

            <div>
              <h2 className="text-xl font-semibold">
                Goals
              </h2>

              <p className="text-muted-foreground">
                Define the objectives for
                this course.
              </p>
            </div>

            <div className="space-y-3">
              {
                fields.map((field, index) => (
                  <GoalFormCard
                    key={field.id}
                    index={index}
                    remove={remove}
                  />
                ))
              }

              <Button
                type="button"
                variant="outline"
                onClick={() => append(emptyGoal)}
                className="cursor-pointer"
              >
                <Plus />
                Add Goal
              </Button>
            </div>

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting && (<Loader2 className="animate-spin mr-2 h-4 w-4"/>)}
              {
                isSubmitting
                ? "Creating..."
                : "Create Course"
              }
            </Button>
          </div>
      </form>
    </FormProvider>
    );
}