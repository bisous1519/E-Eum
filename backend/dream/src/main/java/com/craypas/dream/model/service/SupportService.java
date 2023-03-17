package com.craypas.dream.model.service;

import java.awt.print.Pageable;
import java.util.List;

import com.craypas.dream.model.dto.RequestDto;
import com.craypas.dream.model.dto.ResponseDto;

public interface SupportService {
	// 꿈 후원요청 작성
	ResponseDto.Read createSupport(final RequestDto.Create requestDto);

	// 꿈 후원요청 단일 조회
	ResponseDto.Read getSupport(final Long sid);

	// 꿈 후원요청 전체 조회
	List<ResponseDto.Read> getSupportList(final Pageable pageable);

	// 꿈 후원요청 수정
	ResponseDto.Read updateSupport(final Long sid, final RequestDto.Create requestDto);

	// 꿈 후원요청 삭제
	void deleteSupport(final Long sid);

	// 꿈 후원요청 검색
	List<ResponseDto.Read> searchSupport(final String keyword, final Pageable pageable);

	// 꿈 후원하기
	void createSupportUser(final Long sid, final Long uid, final Integer point);

	// 꿈 후원 취소하기
	void deleteSupportUser(final Long sid, final Long uid);

	// 사진 업로드(?)
}
