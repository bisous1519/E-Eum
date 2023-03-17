package com.craypas.dream.model.repository;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.dream.model.entity.Support;

@Repository
public interface SupportRepository extends JpaRepository<Support, Long> {
	List<Support> findAll(Pageable pageable);
	List<Support> findAllByTitleContaining(String title, Pageable pageable);
}
