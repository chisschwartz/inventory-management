//package com.tciproducts.labelinventory.controllers;
//
//import com.tciproducts.labelinventory.models.Users;
//import com.tciproducts.labelinventory.services.UsersService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/users")
//public class UsersController {
//    //basic vision of the user class with no authentication
//    @Autowired
//    UsersService usersService;
//
//    @GetMapping()
//    Iterable<Users> getAllUsers() {
//        return usersService.getAllUsers();
//    }
//
//    @GetMapping("/{id}")
//    Optional<Users> findUserById(@PathVariable Integer id) {
//        return usersService.findUserById(id);
//    }
//
//    @PostMapping()
//    Users saveUser(@RequestBody Users user) {
//        return usersService.saveUser(user);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteUserById(@PathVariable Integer id) {
//        usersService.deleteUserById(id);
//    }
//
//    @GetMapping("/welcome") public String welcome()
//    {
//        return "Welcome, this endpoint is not secure";
//    }
//
//    @GetMapping("user/userProfile")
//    @PreAuthorize("hasRole('USER')")
//    public String userProfile()
//    {
//        return "Welcome to Users Profile";
//    }
//
//    @GetMapping("/admin/adminProfile")
//    @PreAuthorize("hasRole('ADMIN')")
//    public String adminProfile()
//    {
//        return "Welcome to Admin Profile";
//    }

//}
