package com.websocket.websocketauthsecurity.repository;

import com.websocket.websocketauthsecurity.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
