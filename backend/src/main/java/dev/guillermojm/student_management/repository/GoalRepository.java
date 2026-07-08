package dev.guillermojm.student_management.repository;

import dev.guillermojm.student_management.dto.GoalResponseDTO;
import dev.guillermojm.student_management.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    Optional<Goal> findByUuidAndCourseStudentId(UUID uuid, Long studentId);
    List<Goal> findAllByCourseStudentUuid(UUID uuid);
}
