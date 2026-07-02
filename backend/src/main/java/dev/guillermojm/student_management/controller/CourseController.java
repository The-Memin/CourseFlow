package dev.guillermojm.student_management.controller;

import dev.guillermojm.student_management.dto.CourseRequestDTO;
import dev.guillermojm.student_management.dto.CourseResponseDTO;
import dev.guillermojm.student_management.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<List<CourseResponseDTO>> getCourse(){
        return ResponseEntity.ok(
                courseService.getCoursesByStudent()
        );
    }

    @PutMapping("/{courseUuid}")
    public ResponseEntity<CourseResponseDTO> updateCourse(@PathVariable UUID courseUuid, @Valid @RequestBody CourseRequestDTO dto){
         return ResponseEntity.ok(courseService.updateCourse(courseUuid, dto));
    }

    @PatchMapping("/{courseUuid}")
    public ResponseEntity<CourseResponseDTO> patchCourse( @PathVariable UUID courseUuid, @RequestBody CourseRequestDTO dto){
        return ResponseEntity.ok(courseService.patchCourse(courseUuid, dto));
    }

    @DeleteMapping("/{courseUuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID courseUuid){
        courseService.deleteCourse(courseUuid);
        return ResponseEntity.noContent().build();
    }
}
