package com.craypas.dream.model.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.craypas.dream.exception.CustomException;
import com.craypas.dream.exception.ErrorCode;
import com.craypas.dream.model.dto.record.RequestDto;
import com.craypas.dream.model.dto.record.ResponseDto;
import com.craypas.dream.model.entity.Record;
import com.craypas.dream.model.repository.RecordRepository;

@Service
public class RecordServiceImpl implements RecordService {
	final private RecordRepository recordRepository;

	public RecordServiceImpl(RecordRepository recordRepository) {
		this.recordRepository = recordRepository;
	}

	// 꿈 기록 작성
	@Override
	public ResponseDto.Read createRecord(final RequestDto.Create requestDto) {
		return new ResponseDto.Read(recordRepository.save(requestDto.toEntity()));
	}

	// 꿈 기록 단일 조회
	@Override
	public ResponseDto.Read getRecord(final Long rid) {
		return new ResponseDto.Read(
			recordRepository.findById(rid).orElseThrow(() -> new CustomException(ErrorCode.RECORD_NOT_FOUND)));
	}

	// 꿈 기록 피드 조회
	@Override
	public List<ResponseDto.Read> getRecordList(final Long uid, final Pageable pageable) {
		return recordRepository.findAllByWriterId(uid, pageable)
			.stream()
			.map(ResponseDto.Read::new)
			.collect(Collectors.toList());
	}

	// 꿈 기록 수정
	@Override
	@Transactional
	public ResponseDto.Read updateRecord(final Long rid, final String content) {
		Record record = recordRepository.findById(rid)
			.orElseThrow(() -> new CustomException(ErrorCode.RECORD_NOT_FOUND));
		record.update(content);
		return new ResponseDto.Read(record);
	}

	// 꿈 기록 삭제
	@Override
	public void deleteRecord(final Long rid) {
		recordRepository.delete(
			recordRepository.findById(rid).orElseThrow(() -> new CustomException(ErrorCode.RECORD_NOT_FOUND)));
	}
}
