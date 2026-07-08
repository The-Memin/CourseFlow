package dev.guillermojm.student_management.mapper;

import dev.guillermojm.student_management.dto.GoalRequestDTO;
import dev.guillermojm.student_management.dto.GoalResponseDTO;
import dev.guillermojm.student_management.entity.Goal;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GoalMapper {

    Goal toEntity(GoalRequestDTO dto);

    GoalResponseDTO toResponseDto(Goal goal);
}
