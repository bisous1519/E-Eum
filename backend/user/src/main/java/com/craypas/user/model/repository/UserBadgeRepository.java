package com.craypas.user.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.user.model.entity.Badge;
import com.craypas.user.model.entity.User;
import com.craypas.user.model.entity.UserBadge;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
	List<UserBadge> findAllByUser(User user);

	Integer countAllByUserAndBadge(User user, Badge badge);
}
