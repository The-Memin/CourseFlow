package dev.guillermojm.student_management.controller.admin;

import dev.guillermojm.student_management.service.admin.AdminCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminCourseController {
    private final AdminCourseService adminCourseService;


}
