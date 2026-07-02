package dev.guillermojm.student_management.exception;

import dev.guillermojm.student_management.dto.ErrorResponseDTO;
import tools.jackson.databind.exc.InvalidFormatException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDTO handleValidationErrors(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        Map<String, Object> details = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        details.put(
                                error.getField(),
                                error.getDefaultMessage()
                        ));

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Validation failed",
                "One or more fields are invalid.",
                request.getRequestURI(),
                details
        );
    }

    @ExceptionHandler(ValueNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponseDTO handleValueNotFound(
            ValueNotFoundException ex,
            HttpServletRequest request) {

        return buildResponse(
                HttpStatus.NOT_FOUND,
                "Resource not found",
                ex.getMessage(),
                request.getRequestURI(),
                null
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDTO handleHttpMessageNotReadableException(
            HttpMessageNotReadableException ex,
            HttpServletRequest request) {

        Map<String, Object> details = new HashMap<>();
        String message = "Malformed request body.";

        if (ex.getCause() instanceof InvalidFormatException ife) {

            String field = ife.getPath().isEmpty()
                    ? "unknown"
                    : ife.getPath().get(0).getPropertyName();

            details.put(field, "Invalid value");

            message = "Field '%s' contains an invalid value."
                    .formatted(field);
        }

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Bad Request",
                message,
                request.getRequestURI(),
                details.isEmpty() ? null : details
        );
    }

    private ErrorResponseDTO buildResponse(
            HttpStatus status,
            String error,
            String message,
            String path,
            Map<String, Object> details) {

        return new ErrorResponseDTO(
                LocalDateTime.now(),
                status.value(),
                error,
                message,
                path,
                details
        );
    }
}