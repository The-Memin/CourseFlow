package dev.guillermojm.student_management.auth.mapper;

import dev.guillermojm.student_management.auth.dto.UserResponseDto;
import dev.guillermojm.student_management.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserResponseMapper {
    @Mapping(target = "id", source = "uuid")
    UserResponseDto toDto(Student student);
}
