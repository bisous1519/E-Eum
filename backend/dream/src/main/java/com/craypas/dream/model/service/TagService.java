package com.craypas.dream.model.service;

import java.util.List;
import java.util.Map;

import com.craypas.dream.model.dto.tag.RequestDto;
import com.craypas.dream.model.dto.tag.ResponseDto;

public interface TagService {
	// 태그 생성
	ResponseDto.Read createTag(final RequestDto.Create requestDto);

	// 태그 목록 조회
	List<ResponseDto.Read> getTagList(final Long uid);

	// 태그 수정
	ResponseDto.Read updateTag(final Long tid, final Map<String, String> requestMap);

	// 태그 삭제
	void deleteTag(final Long tid);
}
