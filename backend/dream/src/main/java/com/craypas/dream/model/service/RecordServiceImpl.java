package com.craypas.dream.model.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.craypas.dream.exception.CustomException;
import com.craypas.dream.exception.ErrorCode;
import com.craypas.dream.model.dto.record.RequestDto;
import com.craypas.dream.model.dto.record.ResponseDto;
import com.craypas.dream.model.entity.Record;
import com.craypas.dream.model.repository.RecordRepository;
import com.craypas.dream.model.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {
	private final RecordRepository recordRepository;
	private final TagRepository tagRepository;

	// 꿈 기록 작성
	@Override
	public ResponseDto.Read createRecord(final RequestDto.Create requestDto) {
		// 이미지를 파이어베이스에 저장
		String imagePath = null;
		return new ResponseDto.Read(recordRepository.save(requestDto.toEntity(
			tagRepository.findById(requestDto.getTid()).orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND)),
			imagePath)));
	}

	// 꿈 기록 단일 조회
	@Override
	public ResponseDto.Read getRecord(final Long rid) {
		return new ResponseDto.Read(
			recordRepository.findById(rid).orElseThrow(() -> new CustomException(ErrorCode.RECORD_NOT_FOUND)));
	}

	// 꿈 기록 피드 조회
	@Override
	public ResponseDto.Feed getRecordList(final Long uid, final Long tid) {
		List<Record> records; // repository에서 유저와 태그에 해당되는 record를 날짜 내림차순으로 정렬하여 가져온 리스트
		// 선택된 tag가 없을 때
		if (tid == null) {
			records = recordRepository.findAllByWriterIdOrderByRegTimeDesc(uid);
		}
		// 선택된 tag가 있을 때
		else {
			records = recordRepository.findAllByWriterIdAndTagOrderByRegTimeDesc(uid,
				tagRepository.findById(tid).orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND)));
		}

		List<LocalDate> dateList = new ArrayList<>(); // ResponseDto.Feed의 dateList
		List<ArrayList<ResponseDto.Read>> recordList = new ArrayList<>(); // ResponseDto.Feed의 recordList
		LocalDate preDate = null; // 이전에 선택된 객체의 날짜
		int currIdx = -1; // 현재 기록 리스트에서 접근하고 있는 인덱스
		for (Record record : records) {
			LocalDate currDate = record.getRegTime().toLocalDate(); // 현재 선택된 기록의 날짜
			// 새로운 date가 들어오면 리스트 추가
			if (!currDate.equals(preDate)) {
				dateList.add(currDate);
				recordList.add(new ArrayList<>());
				preDate = currDate;
				currIdx++;
			}
			// 현재 record 객체를 리스트에 추가
			recordList.get(currIdx).add(new ResponseDto.Read(record));
		}
		return new ResponseDto.Feed(currIdx, dateList, recordList);
	}

	// 꿈 기록 수정
	@Override
	@Transactional
	public ResponseDto.Read updateRecord(final Long rid, final RequestDto.Create requestDto) {
		Record record = recordRepository.findById(rid)
			.orElseThrow(() -> new CustomException(ErrorCode.RECORD_NOT_FOUND));
		record.update(requestDto.getContent(), tagRepository.findById(requestDto.getTid())
			.orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND)));
		return new ResponseDto.Read(record);
	}

	// 꿈 기록 삭제
	@Override
	public void deleteRecord(final Long rid) {
		recordRepository.delete(
			recordRepository.findById(rid).orElseThrow(() -> new CustomException(ErrorCode.RECORD_NOT_FOUND)));
	}
}
