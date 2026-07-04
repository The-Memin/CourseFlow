package dev.guillermojm.student_management.service.admin;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@PreAuthorize("hasRole('ADMIN')")
public class AdminService {
    public String ping() {
        return "Admin OK";
    }
}
