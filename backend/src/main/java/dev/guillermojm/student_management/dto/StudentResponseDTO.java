package dev.guillermojm.student_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDTO {
    private UUID id;
    private String name;
    private String email;
    private Integer age;
}
