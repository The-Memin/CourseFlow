package dev.guillermojm.student_management.entity;

import dev.guillermojm.student_management.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name="students")
@Getter @Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private UUID uuid;

    @PrePersist
    public void prePersist() {
        if(uuid == null){
            uuid = UUID.randomUUID();
        }
    }

    private String name;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "student")
    private List<Course> courses;

    public Student() {
    }

    public Student(String name, String email, String password, Integer age) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }
}
