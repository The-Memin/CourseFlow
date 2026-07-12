import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/course.service";
import { calculateCourseProgress } from "@/domain/course/course-progress";

export function useCourses() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["courses"],
        queryFn: courseService.getCourses,
    });

    const deleteCourseMutation = useMutation({
        mutationFn: (courseId: string) => courseService.deleteCourse(courseId),
        onSuccess: (courseId) => {
            console.log(courseId);
            queryClient.invalidateQueries({  queryKey: ["courses"] });
        }
    });

    const courses = query.data ?? [];

    const stats = useMemo(() => {
        const total = courses.length;

        const active = courses.filter(
            c => c.status === "IN_PROGRESS"
        ).length;

        const completed = courses.filter(
            c => c.status === "COMPLETED"
        ).length;

        const average =
            total === 0
                ? 0
                : Math.round(
                      courses.reduce(
                          (acc, course) =>
                              acc + calculateCourseProgress(course),
                          0
                      ) / total
                  );

        return {
            total,
            active,
            completed,
        average,
        };
    }, [courses]);

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesSearch = course.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase());

            const matchesStatus = status === "ALL"
                                    ? true
                                    : course.status === status;

        return (matchesSearch && matchesStatus);
        });
    }, [search, status, courses]);

    return {
        ...query,
        courses,
        stats,
        filteredCourses,
        setStatus,
        setSearch,
        search,
        status,
        deleteCourseMutation
    };
}