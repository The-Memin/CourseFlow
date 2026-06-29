package dev.guillermojm.student_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;


public record ErrorResponseDTO(
        LocalDateTime timestamp,
        Integer status,
        String message,
        Map<String, String> errors
) {}
