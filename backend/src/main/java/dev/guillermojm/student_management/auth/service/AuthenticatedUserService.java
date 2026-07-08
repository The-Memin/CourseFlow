package dev.guillermojm.student_management.auth.service;

import dev.guillermojm.student_management.auth.security.CustomUserDetails;
import dev.guillermojm.student_management.entity.Student;
import dev.guillermojm.student_management.enums.Role;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthenticatedUserService {

    private CustomUserDetails getAuthenticatedUserDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails;
        }

        throw new IllegalStateException("No authenticated user found");
    }

    public Student getAuthenticatedStudent(){
        return getAuthenticatedUserDetails().getStudent();
    }

    public UUID getAuthenticatedStudentUuid(){
        return getAuthenticatedStudent().getUuid();
    }

    public String getAuthenticatedEmail() {
        return getAuthenticatedStudent().getEmail();
    }

    public Role getAuthenticatedRole() {
        return getAuthenticatedStudent().getRole();
    }

    public boolean isAdmin(){
        return getAuthenticatedRole() == Role.ADMIN;
    }
}
