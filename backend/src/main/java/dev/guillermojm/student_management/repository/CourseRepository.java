package dev.guillermojm.student_management.repository;

import dev.guillermojm.student_management.entity.Course;
import dev.guillermojm.student_management.enums.CourseStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByUuidAndStudent_Uuid(UUID uuid,  UUID studentUuid);
    List<Course> findByStudentUuid(UUID studentUuid);
    List<Course> findByStudentUuidAndStatus(
            UUID studentUuid,
            CourseStatus status
    );

    @Query("""
        SELECT c
        FROM Course c
        JOIN FETCH c.student
    """)
    List<Course> findAllWithStudent();
}
