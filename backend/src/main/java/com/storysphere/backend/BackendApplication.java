package com.storysphere.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



@SpringBootApplication
public class BackendApplication {

    @Bean
CommandLineRunner generatePassword() {
    return args -> {
        System.out.println(
            new BCryptPasswordEncoder()
                .encode("admin123")
        );
    };
}
    public static void main(String[] args) {

        SpringApplication.run(
                BackendApplication.class,
                args
        );
    }
}