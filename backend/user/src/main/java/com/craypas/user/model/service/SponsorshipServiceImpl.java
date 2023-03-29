package com.craypas.user.model.service;

import org.springframework.stereotype.Service;

import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.dto.user.ResponseDto;
import com.craypas.user.model.repository.SponsorshipRepository;
import com.craypas.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SponsorshipServiceImpl implements SponsorshipService{
	private final UserRepository userRepository;
	private final SponsorshipRepository sponsorshipRepository;

	// 정기 후원 시작
	@Override
	public ResponseDto.ReadSponsorship createSponsorship(RequestDto.CreateSponsorship requestDto) {
		return null;
	}

	// 정기 후원 정보 조회
	@Override
	public ResponseDto.ReadSponsorship readSponsorship(Long uid, Long sponsorId) {
		return null;
	}

	// 정기 후원 결제 실행
	@Override
	public ResponseDto.ReadSponsorship paySponsorshipPoint(Long uid, Long sponsorId) {
		return null;
	}

	// 정기 후원 정보 수정
	@Override
	public ResponseDto.ReadSponsorship updateSponsorship(RequestDto.CreateSponsorship requestDto) {
		return null;
	}

	// 정기 후원 종료
	@Override
	public void deleteSponsorship(Long uid, Long sponsorId) {

	}
}
