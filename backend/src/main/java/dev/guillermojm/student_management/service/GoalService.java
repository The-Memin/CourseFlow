package dev.guillermojm.student_management.service;

import dev.guillermojm.student_management.auth.service.AuthenticatedUserService;
import dev.guillermojm.student_management.dto.GoalNewRequestDTO;
import dev.guillermojm.student_management.dto.GoalRequestDTO;
import dev.guillermojm.student_management.dto.GoalResponseDTO;
import dev.guillermojm.student_management.entity.Course;
import dev.guillermojm.student_management.entity.Goal;
import dev.guillermojm.student_management.entity.Student;
import dev.guillermojm.student_management.exception.ValueNotFoundException;
import dev.guillermojm.student_management.mapper.GoalMapper;
import dev.guillermojm.student_management.repository.GoalRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;
    private final AuthenticatedUserService authenticatedUserService;
    private final CourseAccessService courseAccessService;

    public GoalResponseDTO createGoal(GoalNewRequestDTO dto) {
        Course course = courseAccessService.getOwnedCourse(dto.courseUuid());

        Goal goal = new Goal(
                dto.name(),
                dto.description(),
                dto.goalUnit(),
                dto.priority(),
                dto.targetValue(),
                0,
                course
        );

        Goal savedGoal = goalRepository.save(goal);

        return goalMapper.toResponseDto(savedGoal);
    }

    public List<GoalResponseDTO> getAllGoals(){
        Student student = authenticatedUserService.getAuthenticatedStudent();

        return goalRepository.findAllByCourseStudentUuid(student.getUuid())
                .stream()
                .map(goalMapper::toResponseDto)
                .toList();

    }

    public GoalResponseDTO getGoalById(UUID uuid){
        Goal goal = getOwnerGoal(uuid);
        return goalMapper.toResponseDto(goal);
    }

    public GoalResponseDTO updateGoal(UUID uuid, GoalNewRequestDTO dto){
        Goal goal = getOwnerGoal(uuid);

        goal.setName(dto.name());
        goal.setDescription(dto.description());
        goal.setCurrentValue(dto.currentValue());
        goal.setGoalUnit(dto.goalUnit());
        goal.setPriority(dto.priority());
        goal.setTargetValue(dto.targetValue());

        Goal goalSaved = goalRepository.save(goal);
        return goalMapper.toResponseDto(goalSaved);
    }

    public GoalResponseDTO patchGoal(UUID uuid, GoalNewRequestDTO goalRequestDTO){
        Goal goal = getOwnerGoal(uuid);

        if(goalRequestDTO.name() != null)
            goal.setName(goalRequestDTO.name());

        if(goalRequestDTO.description() != null)
            goal.setDescription(goalRequestDTO.description());

        if(goalRequestDTO.goalUnit() != null)
            goal.setGoalUnit(goalRequestDTO.goalUnit());

        if(goalRequestDTO.priority() != null)
            goal.setPriority(goalRequestDTO.priority());

        if(goalRequestDTO.targetValue() != null)
            goal.setTargetValue(goalRequestDTO.targetValue());

        if(goalRequestDTO.currentValue() != null){
            goal.setCurrentValue(goalRequestDTO.currentValue());
        }

        Goal goalSaved = goalRepository.save(goal);
        return goalMapper.toResponseDto(goalSaved);
    }

    public void deleteGoal(UUID uuid){
        Goal goal = getOwnerGoal(uuid);
        goalRepository.delete(goal);
    }

    private Goal getOwnerGoal(UUID uuid){
        Student student = authenticatedUserService.getAuthenticatedStudent();

        return goalRepository.findByUuidAndCourseStudentId(uuid, student.getId())
                .orElseThrow(() -> new ValueNotFoundException("Goal not found"));
    }
}
