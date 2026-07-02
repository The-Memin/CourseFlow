package dev.guillermojm.student_management.service;

import dev.guillermojm.student_management.auth.service.AuthenticatedUserService;
import dev.guillermojm.student_management.dto.CourseRequestDTO;
import dev.guillermojm.student_management.dto.CourseResponseDTO;
import dev.guillermojm.student_management.dto.GoalRequestDTO;
import dev.guillermojm.student_management.entity.Course;
import dev.guillermojm.student_management.entity.Goal;
import dev.guillermojm.student_management.entity.Student;
import dev.guillermojm.student_management.mapper.CourseMapper;
import dev.guillermojm.student_management.mapper.GoalMapper;
import dev.guillermojm.student_management.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final GoalMapper goalMapper;
    private final AuthenticatedUserService  authenticatedUserService;
    private final CourseAccessService courseAccessService;

    public CourseResponseDTO createCourse(CourseRequestDTO courseRequestDTO){
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

    public CourseResponseDTO getCourse(UUID courseUuid){
        Course course = courseAccessService.getOwnedCourse(courseUuid);
        return  courseMapper.toResponse(course);
    }

    public List<CourseResponseDTO> getCoursesByStudent(){
        Student student  = authenticatedUserService.getAuthenticatedStudent();
        return courseRepository
                .findByStudent(student)
                .stream()
                .map(courseMapper::toResponse)
                .toList();
    }

    public void deleteCourse(UUID courseId){
        Course course = courseAccessService.getOwnedCourse(courseId);
        courseRepository.delete(course);
    }

    public CourseResponseDTO updateCourse(UUID courseId, CourseRequestDTO courseRequestDTO){
        Course course = courseAccessService.getOwnedCourse(courseId);

        course.setName(courseRequestDTO.name());
        course.setDescription(courseRequestDTO.description());
        course.setStatus(courseRequestDTO.status());

        if (courseRequestDTO.goals() != null){
            for(GoalRequestDTO goalDto: courseRequestDTO.goals()){
                Goal goal = goalMapper.toEntity(goalDto);
                course.addGoal(goal);
            }
        }

        Course courseSaved = courseRepository.save(course);

        return courseMapper.toResponse(courseSaved);
    }

    public CourseResponseDTO patchCourse(UUID courseId, CourseRequestDTO courseRequestDTO){
        Course course = courseAccessService.getOwnedCourse(courseId);
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
