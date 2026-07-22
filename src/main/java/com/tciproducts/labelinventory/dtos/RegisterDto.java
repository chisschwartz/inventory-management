package com.tciproducts.labelinventory.dtos;

import lombok.Data;

//transfers all of our data for later use
@Data
public class RegisterDto {
    private String username;
    private String email;
    private String password;
}
