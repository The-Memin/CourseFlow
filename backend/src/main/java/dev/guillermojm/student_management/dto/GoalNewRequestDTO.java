package dev.guillermojm.student_management.dto;

import dev.guillermojm.student_management.enums.GoalPriority;
import dev.guillermojm.student_management.enums.GoalUnit;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record GoalNewRequestDTO(
        @NotBlank(message = "course name is required")
        String name,

        String description,

        @NotNull
        GoalUnit goalUnit,

        @NotNull
        GoalPriority priority,

        @NotNull
        @Positive
        Integer targetValue,

        @NotNull
        UUID courseUuid,

        @Min(0)
        Integer currentValue
) {
}
