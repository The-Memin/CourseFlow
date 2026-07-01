package dev.guillermojm.student_management.auth.service;

import dev.guillermojm.student_management.auth.security.CustomUserDetails;
import dev.guillermojm.student_management.entity.Student;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedUserService {

    public Student getAuthenticatedStudent(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails.getStudent();
        }

        throw new IllegalStateException("No authenticated user found");
    }

}
