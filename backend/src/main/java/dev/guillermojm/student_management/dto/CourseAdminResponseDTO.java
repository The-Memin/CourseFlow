package dev.guillermojm.student_management.dto;

import dev.guillermojm.student_management.enums.CourseStatus;
import dev.guillermojm.student_management.enums.GoalUnit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class CourseAdminResponseDTO {
    private UUID uuid;

    private String name;

    private String description;

    private CourseStatus status;

    private UUID studentUuid;
    private String studentName;

    private List<GoalResponseDTO> goals;
}
