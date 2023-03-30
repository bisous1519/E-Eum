package com.craypas.dream.model.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.craypas.dream.exception.CustomException;
import com.craypas.dream.exception.ErrorCode;
import com.craypas.dream.model.dto.tag.RequestDto;
import com.craypas.dream.model.dto.tag.ResponseDto;
import com.craypas.dream.model.entity.Tag;
import com.craypas.dream.model.repository.RecordRepository;
import com.craypas.dream.model.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
	private final TagRepository tagRepository;
	private final RecordRepository recordRepository;

	// 태그 생성
	@Override
	public ResponseDto.Read createTag(RequestDto.Create requestDto) {
		return new ResponseDto.Read(tagRepository.save(requestDto.toEntity()));
	}

	// 태그 목록 조회
	@Override
	public List<ResponseDto.Read> getTagList(Long uid) {
		return tagRepository.findAllByUserIdOrderByRegTimeAsc(uid)
			.stream()
			.map(ResponseDto.Read::new)
			.collect(Collectors.toList());
	}

	// 태그 수정
	@Override
	@Transactional
	public ResponseDto.Read updateTag(Long tid, Map<String, String> requestMap) {
		Tag tag = tagRepository.findById(tid).orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND));
		tag.update(requestMap.get("name"));
		return new ResponseDto.Read(tag);
	}

	// 태그 삭제
	@Override
	@Transactional
	public void deleteTag(Long tid) {
		// 1. tid로 태그 객체 조회
		Tag tag = tagRepository.findById(tid).orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND));
		// 2. 해당 태그가 포함된 게시글 삭제
		recordRepository.deleteAllByTag(tag);
		// 3. 태그 삭제
		tagRepository.delete(tag);
	}
}
