package com.storysphere.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.storysphere.backend.dto.LoginResponse;
import com.storysphere.backend.model.User;
import com.storysphere.backend.repository.UserRepository;
import com.storysphere.backend.security.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

        @Autowired
        private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User
    @PostMapping("/register")
    public String registerUser(
            @RequestBody User user
    ) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );

        if (existingUser.isPresent()) {

            return "Email already exists!";
        }

        user.setRole("USER");

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // Login User
    @PostMapping("/login")
    public LoginResponse loginUser(
            @RequestBody User user
    ) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );

        if (existingUser.isEmpty()) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        User dbUser = existingUser.get();

        if (!passwordEncoder.matches(
                user.getPassword(),
                dbUser.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

       String token =
        jwtUtil.generateToken(
                dbUser.getEmail(),
                dbUser.getRole()
        );

return new LoginResponse(
        token,
        dbUser.getUsername(),
        dbUser.getEmail(),
        dbUser.getRole()
);
        }
        }