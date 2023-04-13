package com.craypas.user.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.user.model.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long> {
	List<Faq> findAllByCategory(String category);
}
