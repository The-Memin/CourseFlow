package dev.guillermojm.student_management.controller.admin;

import dev.guillermojm.student_management.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private  final AdminService adminService;

    @GetMapping("/ping")
    public String ping() {
        return adminService.ping();
    }
}
