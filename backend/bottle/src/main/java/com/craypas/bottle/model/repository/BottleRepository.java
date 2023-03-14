package com.craypas.bottle.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.bottle.model.entity.Bottle;

public interface BottleRepository extends JpaRepository<Bottle, Long> {
}