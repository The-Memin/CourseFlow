package dev.guillermojm.student_management.service;

import dev.guillermojm.student_management.auth.service.AuthenticatedUserService;
import dev.guillermojm.student_management.entity.Course;
import dev.guillermojm.student_management.entity.Student;
import dev.guillermojm.student_management.exception.ValueNotFoundException;
import dev.guillermojm.student_management.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseAccessService {
    private final AuthenticatedUserService authenticatedUserService;
    private final CourseRepository courseRepository;

    public Course getOwnedCourse(UUID courseUuid) {
        Student student = authenticatedUserService.getAuthenticatedStudent();

        return courseRepository
                .findByUuidAndStudent(courseUuid, student)
                .orElseThrow(() -> new ValueNotFoundException("Course not found"));
    }
}
