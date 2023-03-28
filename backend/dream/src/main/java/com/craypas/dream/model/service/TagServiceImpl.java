package com.craypas.dream.model.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.craypas.dream.exception.CustomException;
import com.craypas.dream.exception.ErrorCode;
import com.craypas.dream.model.dto.tag.RequestDto;
import com.craypas.dream.model.dto.tag.ResponseDto;
import com.craypas.dream.model.entity.Tag;
import com.craypas.dream.model.repository.TagRepository;

@Service
public class TagServiceImpl implements TagService {
	private final TagRepository tagRepository;

	public TagServiceImpl(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

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
	public ResponseDto.Read updateTag(Long tid, String name) {
		Tag tag = tagRepository.findById(tid).orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND));
		tag.update(name);
		return new ResponseDto.Read(tag);
	}

	// 태그 삭제
	@Override
	public void deleteTag(Long tid) {
		tagRepository.delete(
			tagRepository.findById(tid).orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND)));
	}
}
