package com.craypas.dream.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.dream.model.entity.Record;
import com.craypas.dream.model.entity.Tag;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
	List<Record> findAllByWriterIdOrderByRegTimeDesc(Long writerId);

	List<Record> findAllByWriterIdAndTagOrderByRegTimeDesc(Long writerId, Tag tag);

	void deleteAllByTag(Tag tag);

	Integer countAllByWriterId(Long writerId);
}
