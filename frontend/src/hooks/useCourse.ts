import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/course.service";

export function useCourse(courseId?: string){

    const query = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => courseService.getCourseById(courseId!),
    });

    const course = query.data ?? null;

    return {
        ...query,
        course,
    };

}