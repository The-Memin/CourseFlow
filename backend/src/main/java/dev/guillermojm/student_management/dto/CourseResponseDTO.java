package dev.guillermojm.student_management.dto;

import dev.guillermojm.student_management.enums.CourseStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class CourseResponseDTO {
    private UUID uuid;

    private String name;

    private String description;

    private CourseStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<GoalResponseDTO> goals;
}
