package dev.guillermojm.student_management.exception.factory;

import dev.guillermojm.student_management.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Component
public class ErrorResponseFactory {

    public ErrorResponseDTO create(HttpStatus status,String message, String path, Map<String, Object> details) {
        return new ErrorResponseDTO(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                path,
                details
        );
    }
}
