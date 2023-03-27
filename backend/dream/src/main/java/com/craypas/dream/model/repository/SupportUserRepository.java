package com.craypas.dream.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.dream.model.entity.Support;
import com.craypas.dream.model.entity.SupportUser;

@Repository
public interface SupportUserRepository extends JpaRepository<SupportUser, Long> {
	SupportUser findBySupportAndWriterId(Support support, Long writerId);
	List<SupportUser> findAllBySupport(Support support);
}
