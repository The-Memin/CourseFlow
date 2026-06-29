package dev.guillermojm.student_management.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
        @NotBlank
        String name,

        @Email
        @NotBlank
        String email,

        @Size(min = 8)
        String password,

        @Min(1)
        Integer age

){}
