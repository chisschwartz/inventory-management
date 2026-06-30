package com.tciproducts.labelinventory.models;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User extends AbstractEntity {

    private String username;


}
