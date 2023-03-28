package com.craypas.dream.model.service;

import java.util.List;

import com.craypas.dream.model.dto.support.RequestDto;
import com.craypas.dream.model.dto.support.ResponseDto;

public interface SupportService {
	// 꿈 후원요청 작성
	ResponseDto.Read createSupport(final RequestDto.Create requestDto);

	// 꿈 후원요청 단일 조회
	ResponseDto.Read getSupport(final Long sid);

	// 꿈 후원요청 전체 조회
	List<ResponseDto.Preview> getSupportList(final Integer sortType);

	// 꿈 후원요청 검색
	List<ResponseDto.Preview> searchSupport(final String keyword);

	// 꿈 후원요청 수정시 필요한 정보 조회
	ResponseDto.Update getSupportForUpdate(final Long sid);

	// 꿈 후원요청 수정
	ResponseDto.Read updateSupport(final Long sid, final RequestDto.Create requestDto);

	// 꿈 후원요청 삭제
	void deleteSupport(final Long sid);

	// 꿈 후원하기
	ResponseDto.Read createSupportUser(final Long sid, final Long uid, final Integer point);

	// 꿈 후원 취소하기
	ResponseDto.Read deleteSupportUser(final Long sid, final Long uid);
}
