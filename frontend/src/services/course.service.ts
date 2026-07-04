import type { CreateCourseRequest } from "@/dto/course/create-course.request.dto";
import type { CourseResponseDto } from "@/dto/course/course.response.dto";
import { apiClient } from "@/lib/api-client";
import { mapCourseDtoToCourse } from "@/mappers/course.mapper";

class CourseService{
    async getCourses(){
        const coursesDtos: CourseResponseDto[] = await apiClient.get<CourseResponseDto[]>("/courses");
        const mappedCourses = coursesDtos.map(c => mapCourseDtoToCourse(c));
        return mappedCourses;
        //return mockCourses;
    }

    async getCourseById(id: string){
        const courseDto: CourseResponseDto = await apiClient.get<CourseResponseDto>(`/courses/${id}`);
        const mappedCourse = mapCourseDtoToCourse(courseDto);
        return mappedCourse;
        //return mockCourses.find((course) => course.id === id);
    }

    async createCourse(request: CreateCourseRequest){
        const response = await apiClient.post("/courses", request);
        return response;
    }
}

export const courseService = new CourseService();