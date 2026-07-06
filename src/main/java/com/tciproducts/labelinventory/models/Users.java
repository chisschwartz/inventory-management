package com.tciproducts.labelinventory.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class Users extends AbstractEntity {
    //basic implementation will need roles for editing perms

    @Column(unique = true)
    private String username;

    private String password;

//    @Column(unique = true)
//    private String email;

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
