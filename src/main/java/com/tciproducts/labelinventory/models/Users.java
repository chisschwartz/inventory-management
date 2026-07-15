package com.tciproducts.labelinventory.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users extends AbstractEntity implements UserDetails {
    //basic implementation will need roles for editing perms
    //may want to restrict registration to only tci products email addresses

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    //for potential integration of microsoft login
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private AuthProvider authProvider;

//    public enum AuthProvider {
//        LOCAL
//    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public enum Role {
        USER, ADMIN
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
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
