package dev.guillermojm.student_management.dto;

import java.time.LocalDateTime;
import java.util.Map;


public record ErrorResponseDTO(
        LocalDateTime timestamp,
        Integer status,
        String error,
        String message,
        String path,
        Map<String, Object> details
) {}
