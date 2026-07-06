package com.tciproducts.labelinventory.config;

import com.tciproducts.labelinventory.security.AuthEntryPointJwt;
import com.tciproducts.labelinventory.security.AuthTokenFilter;
import com.tciproducts.labelinventory.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public AuthenticationManager authenticationManager (
        AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
//
//    @Bean
//    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
//        UserDetails admin = User.builder()
//                .username("Chris")
//                .password(encoder.encode("admin"))
//                .roles("ADMIN", "USER")
//                .build();
//
//        UserDetails user = User.builder()
//                .username("Tom")
//                .password(encoder.encode("user"))
//                .roles("USER")
//                .build();
//
//        return new InMemoryUserDetailsManager(admin, user);
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .exceptionHandling(e ->
                        e.authenticationEntryPoint(authEntryPointJwt))
                .sessionManagement(s ->
                        s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/labels/**", "/api/login/**", "/api/register/**", "/api/test/welcome/**").permitAll()
//                                .requestMatchers("/users/user/**").hasRole("USER")
//                                .requestMatchers("/users/admin/**").hasRole("ADMIN")
                                .anyRequest().authenticated()
                );
//                .httpBasic(withDefaults());

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//                .formLogin(form -> form.loginPage("/login").defaultSuccessUrl("/labels").permitAll())
//                .logout(logout -> logout.logoutSuccessUrl("/login?logout").permitAll());

        return http.build();
    }
}
