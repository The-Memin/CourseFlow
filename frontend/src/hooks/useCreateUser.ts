import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/course.service";
import { toast } from "sonner";

export function useCreateCourse(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: courseService.createCourse,
        onSuccess: () => {
            toast.success("Course created successfully");

            queryClient.invalidateQueries({
                queryKey: ["courses"]
            });
        },
        onError: () => {
            toast.error("Failed to create course");
        }
    });
}