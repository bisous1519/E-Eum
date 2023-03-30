package com.craypas.user.model.service;

import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.dto.user.ResponseDto;

public interface SponsorshipService {
	// 정기 후원 시작
	ResponseDto.GetProfileInfo createSponsorship(final RequestDto.CreateSponsorship requestDto);

	// 정기 후원 정보 조회
	ResponseDto.GetProfileInfo readSponsorship(final Long uid, final Long sponsorId);

	// 정기 후원 결제 실행
	ResponseDto.GetProfileInfo paySponsorshipPoint(final Long uid, final Long sponsorId);

	// 정기 후원 정보 수정
	ResponseDto.GetProfileInfo updateSponsorship(final RequestDto.CreateSponsorship requestDto);

	// 정기 후원 종료
	void deleteSponsorship(final Long uid, final Long sponsorId);
}
