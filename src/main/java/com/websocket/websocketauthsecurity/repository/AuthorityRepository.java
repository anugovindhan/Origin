package com.websocket.websocketauthsecurity.repository;

import com.websocket.websocketauthsecurity.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
