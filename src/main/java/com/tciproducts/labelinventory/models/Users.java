package com.tciproducts.labelinventory.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class Users extends AbstractEntity {
    //basic implementation will need roles for editing perms
    //may want to restrict registration to only tci products email addresses

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider authProvider;

    public enum AuthProvider {
        LOCAL
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public enum Role {
        USER, ADMIN
    }

    public Users(String username, String email, String password, AuthProvider provider, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.authProvider = provider;
        this.role = role;
    }

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "users_role",
//    joinColumns = @JoinColumn(name = "users_id"),
//    inverseJoinColumns = @JoinColumn(name = "roles_id")
//    )
//    private Set<Roles> roles = new HashSet<>();
//
//    public void addRole(Roles role) {
//        this.roles.add(role);
//    }
}
