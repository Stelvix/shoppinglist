package com.shoppinglist.shoppinglist.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeDeCourseResponseDTO {
    private UUID id;
    private String name;
    private String description;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
