package com.tciproducts.labelinventory.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class Users extends AbstractEntity {
    //basic implementation will need roles for editing perms

    private String username;

    private String password;

    private String roles;

//    private String email;
//
//    @Override
//    public String toString() {
//        return "Users{" +
//                "username='" + username + '\'' +
//                ", password='" + password + '\'' +
//                ", email='" + email + '\'' +
//                '}';
//    }
}
