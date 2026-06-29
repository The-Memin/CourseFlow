package dev.guillermojm.student_management.mapper;

import dev.guillermojm.student_management.dto.CourseAdminResponseDTO;
import dev.guillermojm.student_management.dto.CourseResponseDTO;
import dev.guillermojm.student_management.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseResponseDTO toResponse(Course course);

    @Mapping(
            target = "studentUuid",
            source = "student.uuid"
    )
    @Mapping(
            target = "studentName",
            source = "student.name"
    )
    CourseAdminResponseDTO toAdminResponse(Course course);
}
