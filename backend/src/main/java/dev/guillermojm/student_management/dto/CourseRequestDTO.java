package dev.guillermojm.student_management.dto;

import dev.guillermojm.student_management.enums.CourseStatus;
import dev.guillermojm.student_management.enums.GoalUnit;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.List;

public record CourseRequestDTO(
        @NotBlank(message = "Name is required")
        String name,

        String description,

        @NotNull
        CourseStatus status,

        @Size(min = 1, max = 10)
        @Valid
        List<GoalRequestDTO> goals
){}
