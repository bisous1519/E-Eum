package com.craypas.dream.model.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.dream.model.entity.Support;

@Repository
public interface SupportRepository extends JpaRepository<Support, Long> {
	Page<Support> findAll(Pageable pageable);
	List<Support> findAllByTitleContainingOrderByRegTimeDesc(String title);
	List<Support> findAllByStatus(Integer status);
}
