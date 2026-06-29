package dev.guillermojm.student_management.service;

import dev.guillermojm.student_management.dto.StudentRequestDTO;
import dev.guillermojm.student_management.dto.StudentResponseDTO;
import dev.guillermojm.student_management.entity.Student;
import dev.guillermojm.student_management.enums.Role;
import dev.guillermojm.student_management.exception.ValueNotFoundException;
import dev.guillermojm.student_management.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder ) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }


    private StudentResponseDTO mapToResponse(Student student){
        StudentResponseDTO responseDTO = new StudentResponseDTO();

        responseDTO.setId(student.getUuid());
        responseDTO.setName(student.getName());
        responseDTO.setEmail(student.getEmail());
        responseDTO.setAge(student.getAge());

        return  responseDTO;
    }

    public Page<StudentResponseDTO> getStudents(Pageable pageable){
        Page<Student> students = studentRepository.findAll(pageable);
        return students.map(this::mapToResponse);
    }

    public StudentResponseDTO getStudentById(UUID id){
        Student student = studentRepository.findByUuid(id)
                .orElseThrow(() -> new ValueNotFoundException("Student with id " + id + " not found"));
        return mapToResponse(student);
    }


    public Page<StudentResponseDTO> getStudentsByAge(Integer age, Pageable pageable){
        Page<Student> students = studentRepository.findByAge(age, pageable);
        return students.map(this::mapToResponse);
    }

    public StudentResponseDTO getStudentByEmail(String email){
        Student student = studentRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ValueNotFoundException("Student with email " + email + " not found")
                        );
        return mapToResponse(student);
    }

    public StudentResponseDTO createStudent(StudentRequestDTO dto){
        Student student = new Student();
        student.setName(dto.name());
        student.setEmail(dto.email());

        student.setAge(dto.age());

        student.setRole(Role.USER);
        student.setPassword(passwordEncoder.encode(dto.password()));
        if(studentRepository.findByEmail(dto.email()).isPresent()){
            throw new RuntimeException("Student with email " + dto.email() + " already exists");
        }

        Student saved = studentRepository.save(student);

        return mapToResponse(saved);
    }

    public StudentResponseDTO updateStudent(UUID id, StudentRequestDTO dto){
        Student student = studentRepository.findByUuid(id)
                .orElseThrow(() -> new ValueNotFoundException("Student with id " + id + " not found"));

        student.setName(dto.name());
        student.setEmail(dto.email());
        student.setAge(dto.age());

        Student studentSaved = studentRepository.save(student);

        return mapToResponse(studentSaved);
    }

    public void deleteStudent(UUID id){
        Student student = studentRepository.findByUuid(id)
                .orElseThrow(() -> new ValueNotFoundException("Student with id " + id + " not found"));
        studentRepository.delete(student);
    }

    public StudentResponseDTO patchStudent(UUID id, StudentRequestDTO dto) {

        Student student = studentRepository.findByUuid(id)
                .orElseThrow(() -> new ValueNotFoundException("Student with id " + id + " not found"));

        if (dto.name() != null && !dto.name().isBlank()) {
            student.setName(dto.name());
        }

        if (dto.email() != null && !dto.email().isBlank()) {
            student.setEmail(dto.email());
        }

        if (dto.age() != null && dto.age() > 0) {
            student.setAge(dto.age());
        }

        Student studentSaved = studentRepository.save(student);

        return mapToResponse(studentSaved);
    }
}
