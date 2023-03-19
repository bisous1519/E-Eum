package com.craypas.bottle.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.bottle.model.entity.Bottle;

public interface BottleRepository extends JpaRepository<Bottle, Long> {
	List<Bottle> findAllByWriterId(Long writerId);
}