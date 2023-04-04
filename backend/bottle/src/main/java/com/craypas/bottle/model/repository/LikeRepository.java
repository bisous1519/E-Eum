package com.craypas.bottle.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.bottle.model.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {
	Optional<Like> findByUserIdAndResBottleId(Long userId, Long resBottleId);
}
