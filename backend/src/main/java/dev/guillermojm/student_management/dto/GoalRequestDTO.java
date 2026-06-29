package dev.guillermojm.student_management.dto;

import dev.guillermojm.student_management.enums.GoalPriority;
import dev.guillermojm.student_management.enums.GoalUnit;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record GoalRequestDTO(
        @NotBlank(message = "course name is required")
        String name,

        String description,

        @NotNull
        GoalUnit goalUnit,

        @NotNull
        GoalPriority priority,

        @NotNull
        @Positive
        Integer targetValue
){}
