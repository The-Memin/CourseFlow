package dev.guillermojm.student_management.auth.exception;

import dev.guillermojm.student_management.dto.ErrorResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tools.jackson.databind.exc.InvalidFormatException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponseDTO handleEmailAlreadyExistException(EmailAlreadyExistException ex, HttpServletRequest request){
        Map<String, Object> details = new HashMap<>();
        String message = "Email already exist.";

        if (ex.getCause() instanceof InvalidFormatException ife) {

            String field = ife.getPath().isEmpty()
                    ? "unknown"
                    : ife.getPath().get(0).getPropertyName();

            details.put(field, "Invalid value");

            message = "Field '%s' contains an invalid value."
                    .formatted(field);
        }

        return new ErrorResponseDTO(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                "Email already exist",
                message,
                request.getRequestURI(),
                details
        );
    }
}
