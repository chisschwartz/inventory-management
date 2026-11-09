package com.tciproducts.labelinventory.config;

import com.tciproducts.labelinventory.security.AuthTokenFilter;
import com.tciproducts.labelinventory.models.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder, UserRepository userRepository) {
        UserDetails admin = User.builder()
                .username("Chris")
                .password(encoder.encode("admin"))
                .roles("ADMIN", "USER")
                .build();

        UserDetails user = User.builder()
                .username("Tom")
                .password(encoder.encode("user"))
                .roles("USER")
                .build();

        UserDetailsService fallbackUsers = new InMemoryUserDetailsManager(admin, user);
        return username -> userRepository.findByUsername(username)
                .<UserDetails>map(databaseUser -> databaseUser)
                .orElseGet(() -> fallbackUsers.loadUserByUsername(username));
    }

    //Our security chain that filters requests and only lets admins or users access certain urls
    @Bean
    public SecurityFilterChain securedFilterChain(HttpSecurity http, AuthTokenFilter authTokenFilter) throws Exception {
         http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/login").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/register").hasRole("ADMIN")
                        .requestMatchers("/labels/**", "/users/user/**", "/api/test/public/**").hasRole("USER")
                        .requestMatchers("/api/login/**", "/api/test/welcome/**").permitAll()
                                .requestMatchers("/api/test/private/**", "/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                 .addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());

         return http.build();
    }
}
