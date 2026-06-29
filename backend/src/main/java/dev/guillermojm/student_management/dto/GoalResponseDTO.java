package dev.guillermojm.student_management.dto;

import dev.guillermojm.student_management.enums.GoalPriority;
import dev.guillermojm.student_management.enums.GoalUnit;

import java.util.UUID;

public record GoalResponseDTO(
        UUID uuid,
        String name,
        String description,
        GoalUnit goalUnit,
        GoalPriority priority,
        Integer targetValue,
        Integer currentValue
){}
