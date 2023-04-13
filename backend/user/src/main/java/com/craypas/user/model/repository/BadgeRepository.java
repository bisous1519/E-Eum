package com.craypas.user.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.user.model.entity.Badge;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

}
