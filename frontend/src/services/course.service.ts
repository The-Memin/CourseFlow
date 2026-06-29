import { createCourseMock } from "@/mocks/courses.mock";
import type { CreateCourseRequest } from "@/dto/course/create-course.request.dto";
import type { CreateCourseResponse } from "@/dto/course/create-course.response.dto";
import type { CourseResponseDto } from "@/dto/course/course.response.dto";
import { apiClient } from "@/lib/api-client";
import { mockCourses } from "@/mocks/courses";
import { mapCourseDtoToCourse } from "@/mappers/course.mapper";

class CourseService{
    async getCourses(){
        const coursesDtos: CourseResponseDto[] = await apiClient.get<CourseResponseDto[]>("/courses");
        const mappedCourses = coursesDtos.map(c => mapCourseDtoToCourse(c));
        return mappedCourses;
        //return mockCourses;
    }

    async getCourseById(id: string){
        return mockCourses.find(course => course.id === id);
    }

    async createCourse(request: CreateCourseRequest){
        console.log(request);

        return{
            success: true,
            id: crypto.randomUUID()
        };
    }
}

export const courseService = new CourseService();