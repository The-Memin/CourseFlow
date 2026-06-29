package dev.guillermojm.student_management.auth.mapper;

import dev.guillermojm.student_management.auth.dto.RegisterRequestDTO;
import dev.guillermojm.student_management.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    Student toEntity(RegisterRequestDTO dto);
}