package dev.guillermojm.student_management.dto;

import jakarta.validation.constraints.*;

public record StudentRequestDTO(
        @NotBlank(message = "Name is required")
        String name,

        @Email(message="Invalid email format")
        @NotBlank(message = "email is required")
        String email,

        @NotBlank(message = "password is required")
        @Size(min = 8, max = 50, message = "La contraseña debe tener entre 8 y 50 caracteres")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,50}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter and one number"
        )
        String password,

        @NotNull(message = "Age is required")
        @Min(value=5, message = "Age must be at least 5")
        @Max(value = 100, message = "Age must be less than 100")
        Integer age
){}
