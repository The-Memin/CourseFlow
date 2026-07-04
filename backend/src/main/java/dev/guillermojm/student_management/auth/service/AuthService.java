package dev.guillermojm.student_management.auth.service;

import dev.guillermojm.student_management.auth.dto.AuthResponseDTO;
import dev.guillermojm.student_management.auth.dto.LoginRequestDTO;
import dev.guillermojm.student_management.auth.dto.RegisterRequestDTO;
import dev.guillermojm.student_management.auth.exception.EmailAlreadyExistException;
import dev.guillermojm.student_management.auth.jwt.JwtService;
import dev.guillermojm.student_management.auth.mapper.StudentMapper;
import dev.guillermojm.student_management.auth.mapper.UserResponseMapper;
import dev.guillermojm.student_management.auth.security.CustomUserDetails;
import dev.guillermojm.student_management.entity.Student;
import dev.guillermojm.student_management.enums.Role;
import dev.guillermojm.student_management.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final StudentMapper studentMapper;
    private final UserResponseMapper userResponseMapper;
    private final JwtService jwtService;

    public AuthResponseDTO register(RegisterRequestDTO request){
        if(studentRepository.existsByEmail(request.email())){
            throw new EmailAlreadyExistException("Student with email " + request.email() + " already exists");
        }

        Student student = studentMapper.toEntity(request);

        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setRole(Role.USER);

        studentRepository.save(student);

        String token  = jwtService.generateToken(student);

        return new AuthResponseDTO(
                token,
                userResponseMapper.toDto(student)
        );
    }

    public AuthResponseDTO login(LoginRequestDTO request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Student student = userDetails.getStudent();

        String token = jwtService.generateToken(student);
        return new AuthResponseDTO(
                token,
                userResponseMapper.toDto(student)
        );
    }
}
