package dev.guillermojm.student_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.guillermojm.student_management.enums.CourseStatus;
import dev.guillermojm.student_management.enums.GoalUnit;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "courses")
@Getter @Setter
@NoArgsConstructor
public class Course extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private UUID uuid;

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private CourseStatus status;

    public Course(String name, String description, CourseStatus status, Student student) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.student = student;
    }

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    @OneToMany(
            mappedBy = "course",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Goal> goals = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (uuid == null) {
            uuid = UUID.randomUUID();
        }
    }

    public void addGoal(Goal goal) {
        goals.add(goal);
        goal.setCourse(this);
    }

    public void removeGoal(Goal goal) {
        goals.remove(goal);
        goal.setCourse(null);
    }
}
