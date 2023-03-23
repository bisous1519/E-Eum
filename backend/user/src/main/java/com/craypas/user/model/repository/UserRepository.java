package com.craypas.user.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.user.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findAllByEmail(String email);
	List<User> findAllByNameAndEmail(String name, String email);
}