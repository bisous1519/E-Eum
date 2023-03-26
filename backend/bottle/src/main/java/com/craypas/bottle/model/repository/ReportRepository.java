package com.craypas.bottle.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.bottle.model.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
