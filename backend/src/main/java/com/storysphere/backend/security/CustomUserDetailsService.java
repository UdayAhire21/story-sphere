package com.storysphere.backend.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.storysphere.backend.repository.UserRepository;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
public UserDetails loadUserByUsername(
        String email
) throws UsernameNotFoundException {

    com.storysphere.backend.model.User user =
            userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(
                                    "User not found"
                            ));

        System.out.println(
    "Role from DB = " + user.getRole()
);

    return new User(
        user.getEmail(),
        user.getPassword(),
        List.of(
                new SimpleGrantedAuthority(
                        user.getRole()
                )
        )
);
}
}