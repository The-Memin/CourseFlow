import type { Course } from "@/types/course";

export function findCourseById(courses: Course[], id: string){
    return courses.find(course => course.id === id);
}