package com.tciproducts.labelinventory.dtos;

import com.tciproducts.labelinventory.models.Users;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminUserRequest(
        @NotBlank @Size(max = 100) String username,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(min = 8, max = 72) String password,
        @NotNull Users.Role role
) {
}
