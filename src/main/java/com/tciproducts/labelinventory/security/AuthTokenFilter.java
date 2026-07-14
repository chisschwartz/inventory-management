package com.tciproducts.labelinventory.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    //the beginning of all tokens
    public static final String BEARER_ = "Bearer ";

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
        throws ServletException, IOException {
        //Check if the request has Authorization header
        final String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        //Read token from the Bearer
        if(authHeader != null && authHeader.startsWith(BEARER_)) {

            token = authHeader.substring(BEARER_.length());

            try {
                //Extract username
                username = jwtUtil.extractUsername(token);
            } catch (Exception e) {
                System.out.println("Invalid token: " + e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            //check if token is valid
            if (jwtUtil.validateToken(token, userDetails.getUsername())) {
                //setting authentication in spring
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                //sets our authentication
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

//    @Autowired
//    private CustomUserDetailsService userDetailsService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        try {
//            //grabs username from a valid token then makes sure password matches database password
//            String jwt = parseJwt(request);
//
//            if (jwt != null && jwtUtil.validateJwtToken(jwt)) {
//                final String username = jwtUtil.getUserFromToken(jwt);
//                final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                UsernamePasswordAuthenticationToken authenticationToken =
//                        new UsernamePasswordAuthenticationToken(
//                                userDetails,
//                                null,
//                                userDetails.getAuthorities()
//                        );
//
//                authenticationToken.setDetails(new WebAuthenticationDetailsSource()
//                        .buildDetails(request));
//
//                SecurityContextHolder.getContext()
//                        .setAuthentication(authenticationToken);
//            }
//        } catch (Exception e) {
//            log.error("Cannot set user authentication: {}", e);
//        }
//
//        filterChain.doFilter(request, response);
//    }
//
//    //puts our token into the header
//    private String parseJwt(HttpServletRequest request) {
//        String headerAuth = request.getHeader("Authorization");
//
//        if (headerAuth != null && headerAuth.startsWith(BEARER_)) {
//            return headerAuth.substring(BEARER_.length());
//        }
//
//        return null;
//    }
}
