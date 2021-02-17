package com.websocket.websocketauthsecurity.service;

import com.websocket.websocketauthsecurity.model.User;
import com.websocket.websocketauthsecurity.repository.UserRepository;
import com.websocket.websocketauthsecurity.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername);
    }


}
