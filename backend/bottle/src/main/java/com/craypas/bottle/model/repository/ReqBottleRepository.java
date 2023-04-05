package com.craypas.bottle.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.bottle.model.entity.ReqBottle;

public interface ReqBottleRepository extends JpaRepository<ReqBottle, Long> {
	List<ReqBottle> findAllById(Long id);
	List<ReqBottle> findAllByWriterId(Long writerId);
}