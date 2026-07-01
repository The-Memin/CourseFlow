package dev.guillermojm.student_management.controller;

import dev.guillermojm.student_management.dto.CourseAdminResponseDTO;
import dev.guillermojm.student_management.dto.CourseRequestDTO;
import dev.guillermojm.student_management.dto.CourseResponseDTO;
import dev.guillermojm.student_management.entity.Course;
import dev.guillermojm.student_management.enums.CourseStatus;
import dev.guillermojm.student_management.enums.GoalUnit;
import dev.guillermojm.student_management.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<CourseResponseDTO> createCourse( @Valid @RequestBody CourseRequestDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        courseService.createCourse(
                                dto
                        )
                );
    }

    @GetMapping("/api/students/{studentUuid}/courses")
    public ResponseEntity<List<CourseResponseDTO>> getCourse(@PathVariable UUID studentUuid){
        return ResponseEntity.ok(
                courseService.getCoursesByStudent(
                        studentUuid
                )
        );
    }

    @GetMapping("/api/courses")
    public ResponseEntity<List<CourseAdminResponseDTO>> getCourses(
            @RequestParam(required = false)
            CourseStatus status,

            @RequestParam(required = false)
            String search
    ){
        return ResponseEntity.ok(
                courseService.getCourses()
        );
    }

    @PutMapping("/api/students/{studentUuid}/courses/{courseUuid}")
    public ResponseEntity<CourseResponseDTO> updateCourse(@PathVariable UUID studentUuid, @PathVariable UUID courseUuid, @Valid @RequestBody CourseRequestDTO dto){
         return ResponseEntity.ok(courseService.updateCourse(courseUuid, studentUuid, dto));
    }

    @PatchMapping("/api/students/{studentUuid}/courses/{courseUuid}")
    public ResponseEntity<CourseResponseDTO> patchCourse(@PathVariable UUID studentUuid, @PathVariable UUID courseUuid, @RequestBody CourseRequestDTO dto){
        return ResponseEntity.ok(courseService.patchCourse(courseUuid, studentUuid, dto));
    }

    @DeleteMapping("/api/students/{studentUuid}/courses/{courseUuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID studentUuid, @PathVariable UUID courseUuid){
        courseService.deleteCourse(courseUuid,  studentUuid);
        return ResponseEntity.noContent().build();
    }
}
