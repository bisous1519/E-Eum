package com.craypas.dream.model.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.craypas.dream.model.dto.record.RequestDto;
import com.craypas.dream.model.dto.record.ResponseDto;

public interface RecordService {
	// 꿈 기록 작성
	ResponseDto.Read createRecord(final RequestDto.Create requestDto);

	// 꿈 기록 단일 조회
	ResponseDto.Read getRecord(final Long rid);

	// 꿈 기록 피드 조회
	List<ResponseDto.Read> getRecordList(final Long uid, final Pageable pageable);

	// 꿈 기록 수정
	ResponseDto.Read updateRecord(final Long rid, final String content);

	// 꿈 기록 삭제
	void deleteRecord(final Long rid);
}
