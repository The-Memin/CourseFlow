package dev.guillermojm.student_management.repository;

import dev.guillermojm.student_management.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    Optional<Student> findByUuid(UUID uuid);
    boolean existsByEmail(String email);

    @Query("""
        SELECT s
        FROM Student s
        WHERE s.age > :age
    """
    )
    Page<Student> findByAge(@Param("age") Integer age, Pageable pageable);

    @Query("""
       SELECT s
       FROM Student s
       WHERE LOWER(s.name)
       LIKE LOWER(CONCAT('%', :name, '%'))
       """)
    Page<Student> searchByName(@Param("name") String name, Pageable pageable);

}
