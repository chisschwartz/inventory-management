package com.tciproducts.labelinventory.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record AddSizingRequest(
        @NotBlank @Size(max = 255) String size,
        @NotNull @PositiveOrZero Integer quantity
) {
}
