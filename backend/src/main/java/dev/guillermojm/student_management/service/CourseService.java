package dev.guillermojm.student_management.service;

import dev.guillermojm.student_management.auth.service.AuthenticatedUserService;
import dev.guillermojm.student_management.dto.CourseAdminResponseDTO;
import dev.guillermojm.student_management.dto.CourseRequestDTO;
import dev.guillermojm.student_management.dto.CourseResponseDTO;
import dev.guillermojm.student_management.dto.GoalRequestDTO;
import dev.guillermojm.student_management.entity.Course;
import dev.guillermojm.student_management.entity.Goal;
import dev.guillermojm.student_management.entity.Student;
import dev.guillermojm.student_management.exception.ValueNotFoundException;
import dev.guillermojm.student_management.mapper.CourseMapper;
import dev.guillermojm.student_management.mapper.GoalMapper;
import dev.guillermojm.student_management.repository.CourseRepository;
import dev.guillermojm.student_management.repository.StudentRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final CourseMapper courseMapper;
    private final GoalMapper goalMapper;
    private final AuthenticatedUserService  authenticatedUserService;

    public CourseService(
            CourseRepository courseRepository,
            StudentRepository studentRepository,
            CourseMapper courseMapper,
            GoalMapper goalMapper,
            AuthenticatedUserService authenticatedUserService) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.courseMapper = courseMapper;
        this.goalMapper = goalMapper;
        this.authenticatedUserService = authenticatedUserService;
    }

    public CourseResponseDTO createCourse( CourseRequestDTO courseRequestDTO){
        Student student = authenticatedUserService.getAuthenticatedStudent();

        Course course = new Course(
                courseRequestDTO.name(),
                courseRequestDTO.description(),
                courseRequestDTO.status(),
                student
        );

        for(GoalRequestDTO goalDto: courseRequestDTO.goals()){
            Goal goal = goalMapper.toEntity(goalDto);
            course.addGoal(goal);
        }

        Course savedCourse = courseRepository.save(course);

        return courseMapper.toResponse(savedCourse);
    }

    public List<CourseResponseDTO> getCoursesByStudent(UUID studentUuid){

        return courseRepository
                .findByStudentUuid(studentUuid)
                .stream()
                .map(courseMapper::toResponse)
                .toList();
    }

    public List<CourseAdminResponseDTO> getCourses(){
        return courseRepository
                .findAllWithStudent()
                .stream()
                .map(courseMapper::toAdminResponse)
                .toList();
    }

    public void deleteCourse(UUID courseId, UUID studentUuid){
        Course course = courseRepository.findByUuidAndStudent_Uuid(courseId, studentUuid)
                .orElseThrow( () ->
                        new ValueNotFoundException("Course with id: " + courseId + " not found.")
                        );
        courseRepository.delete(course);
    }

    public CourseResponseDTO updateCourse(UUID courseId, UUID studentUuid, CourseRequestDTO courseRequestDTO){
        Course course = courseRepository.findByUuidAndStudent_Uuid(courseId, studentUuid)
                .orElseThrow(()->
                        new ValueNotFoundException("Course with id: " + courseId + " and student id: " + studentUuid + " not found.")
                );
        course.setName(courseRequestDTO.name());
        course.setDescription(courseRequestDTO.description());
        course.setStatus(courseRequestDTO.status());

        for(GoalRequestDTO goalDto: courseRequestDTO.goals()){
            Goal goal = goalMapper.toEntity(goalDto);
            course.addGoal(goal);
        }

        Course courseSaved = courseRepository.save(course);

        return courseMapper.toResponse(courseSaved);
    }

    public CourseResponseDTO patchCourse(UUID courseId, UUID studentUuid, CourseRequestDTO courseRequestDTO){
        Course course = courseRepository.findByUuidAndStudent_Uuid(courseId, studentUuid)
                .orElseThrow(()->
                        new ValueNotFoundException("Course with id: " + courseId + " and student id: " + studentUuid + " not found.")
                );
        if (courseRequestDTO.name() != null && !courseRequestDTO.name().isBlank())
            course.setName(courseRequestDTO.name());

        if (courseRequestDTO.description() != null && !courseRequestDTO.description().isBlank())
            course.setDescription(courseRequestDTO.description());

        if (courseRequestDTO.goals() != null && !courseRequestDTO.goals().isEmpty()){
            for(GoalRequestDTO goalDto: courseRequestDTO.goals()){
                Goal goal = goalMapper.toEntity(goalDto);
                course.addGoal(goal);
            }
        }

        if(courseRequestDTO.status() != null)
            course.setStatus(courseRequestDTO.status());

        Course courseSaved = courseRepository.save(course);

        return courseMapper.toResponse(courseSaved);
    }
}
