package in.vishwasprabhu18.money_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {
    private Long id;
    private Long profileId;
    private String name;
    private String icon;
    private String type;
    private String color;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
