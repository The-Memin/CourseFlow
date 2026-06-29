package dev.guillermojm.student_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.guillermojm.student_management.enums.GoalPriority;
import dev.guillermojm.student_management.enums.GoalUnit;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "goals")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private UUID uuid;

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private GoalUnit goalUnit;

    @Enumerated(EnumType.STRING)
    private GoalPriority priority;

    @Column(nullable = false)
    private Integer targetValue;

    @Column(nullable = false)
    @Builder.Default
    private Integer currentValue = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Course course;

    @PrePersist
    public void prePersist() {
        if(uuid == null){
            uuid = UUID.randomUUID();
        }
    }
}
