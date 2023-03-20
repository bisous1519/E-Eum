package com.craypas.dream.model.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.dream.model.entity.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
	List<Record> findAllByWriterId(Long writerId, Pageable pageable);
}
