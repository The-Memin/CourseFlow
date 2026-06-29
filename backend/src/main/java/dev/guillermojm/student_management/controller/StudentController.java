package dev.guillermojm.student_management.controller;

import dev.guillermojm.student_management.dto.StudentRequestDTO;
import dev.guillermojm.student_management.dto.StudentResponseDTO;
import dev.guillermojm.student_management.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<Page<StudentResponseDTO>> getStudents(Pageable pageable) {
        Page<StudentResponseDTO> student = studentService.getStudents(pageable);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable UUID id){
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<StudentResponseDTO> getStudentByEmail(@PathVariable String email){
        return ResponseEntity.ok(studentService.getStudentByEmail(email));
    }


    @GetMapping("/agegreaterthan")
    public ResponseEntity<Page<StudentResponseDTO>> getStudentsByAge(@RequestParam int age, Pageable pageable){
        return ResponseEntity.ok(
                studentService.getStudentsByAge(age, pageable));
    }

    @PostMapping
    public ResponseEntity<StudentResponseDTO> addStudent(@Valid @RequestBody StudentRequestDTO dto){
        StudentResponseDTO student = studentService.createStudent(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> updateStudent(@PathVariable UUID id, @RequestBody StudentRequestDTO dto){
        return ResponseEntity.ok(studentService.updateStudent(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id){
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> patchStudent(@PathVariable UUID id, @RequestBody StudentRequestDTO student){
        return ResponseEntity.ok(studentService.patchStudent(id, student));
    }
}
