package dev.guillermojm.student_management.controller;

import dev.guillermojm.student_management.dto.GoalCreateRequestDTO;
import dev.guillermojm.student_management.dto.GoalRequestDTO;
import dev.guillermojm.student_management.dto.GoalResponseDTO;
import dev.guillermojm.student_management.service.GoalService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/goals")
@AllArgsConstructor
public class GoalController {
    private final GoalService  goalService;

    @PostMapping
    public ResponseEntity<GoalResponseDTO> createGoal(@Valid @RequestBody GoalCreateRequestDTO goalDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                goalService.createGoal(goalDto)
        );
    }

    @GetMapping
    public ResponseEntity<List<GoalResponseDTO>> getAllGoals(){
        return ResponseEntity.ok(
                goalService.getAllGoals()
        );
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<GoalResponseDTO> getGoalById(@PathVariable UUID uuid){
        return ResponseEntity.ok(
          goalService.getGoalById(uuid)
        );
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<GoalResponseDTO> updateGoal(@PathVariable UUID uuid, @Valid @RequestBody GoalRequestDTO dto){
        return ResponseEntity.ok(
                goalService.updateGoal(uuid, dto)
        );
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<GoalResponseDTO> patchGoal(@PathVariable UUID uuid, @RequestBody GoalRequestDTO goalRequestDTO){
        return ResponseEntity.ok(
                goalService.patchGoal(uuid, goalRequestDTO)
        );
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteGoal(@PathVariable UUID uuid){
        goalService.deleteGoal(uuid);
        return ResponseEntity.noContent().build();
    }
}
