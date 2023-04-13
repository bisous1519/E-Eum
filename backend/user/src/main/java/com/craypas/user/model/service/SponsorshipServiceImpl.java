package com.craypas.user.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.craypas.user.exception.CustomException;
import com.craypas.user.exception.ErrorCode;
import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.dto.user.ResponseDto;
import com.craypas.user.model.entity.Sponsorship;
import com.craypas.user.model.entity.User;
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
	public ResponseDto.GetProfileInfo createSponsorship(RequestDto.CreateSponsorship requestDto) {
		User user = userRepository.findById(requestDto.getUid())
			.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		User sponsor = userRepository.findById(requestDto.getSponsorId())
			.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		if (sponsorshipRepository.countAllByUserAndSponsorId(user, sponsor.getId()) > 0) {
			deleteSponsorship(user.getId(), sponsor.getId());
		}
		Sponsorship sponsorship = sponsorshipRepository.save(requestDto.toEntity(user));
		ResponseDto.GetProfileInfo responseDto = ResponseDto.GetProfileInfo.builder()
			.user(user)
			.isConnected(true)
			.build();
		responseDto.updateSponsorshipInfo(sponsorship);
		return responseDto;
	}

	// 정기 후원 정보 조회
	@Override
	public ResponseDto.GetProfileInfo readSponsorship(Long uid, Long sponsorId) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		// 1. 두 회원이 동일인물일 때
		if (uid == sponsorId) {
			return ResponseDto.GetProfileInfo.builder().user(user).myPoint(user.getPoint()).build();
		}
		// 2. 두 회원이 서로 다른 회원일 때
		User sponsor = userRepository.findById(sponsorId)
			.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		// 2-1. 서로 다른 두 회원이 비후원 관계일 때
		if (sponsorshipRepository.countAllByUserAndSponsorId(user, sponsorId) == 0) {
			return ResponseDto.GetProfileInfo.builder().user(user).isConnected(false).build();
		}
		// 2-2. 서로 다른 두 회원이 후원 관계일 때
		else {
			Sponsorship sponsorship = sponsorshipRepository.findByUserAndSponsorId(user, sponsorId);
			ResponseDto.GetProfileInfo responseDto = ResponseDto.GetProfileInfo.builder()
				.user(user)
				.isConnected(true)
				.build();
			responseDto.updateSponsorshipInfo(sponsorship);
			return responseDto;
		}
	}

	// 정기 후원 결제 실행
	@Override
	@Transactional
	public ResponseDto.GetProfileInfo paySponsorshipPoint(Long uid, Long sponsorId) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		User sponsor = userRepository.findById(sponsorId)
			.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		Sponsorship sponsorship = sponsorshipRepository.findByUserAndSponsorId(user, sponsorId);
		sponsor.updatePoint((-1) * sponsorship.getPoint());
		user.updatePoint(sponsorship.getPoint());
		sponsorship.updateCountPayment();
		ResponseDto.GetProfileInfo responseDto = ResponseDto.GetProfileInfo.builder()
			.user(user)
			.isConnected(true)
			.build();
		responseDto.updateSponsorshipInfo(sponsorship);
		return responseDto;
	}

	// 정기 후원 정보 수정
	@Override
	@Transactional
	public ResponseDto.GetProfileInfo updateSponsorship(RequestDto.CreateSponsorship requestDto) {
		User user = userRepository.findById(requestDto.getUid())
			.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		User sponsor = userRepository.findById(requestDto.getSponsorId())
			.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		Sponsorship sponsorship = sponsorshipRepository.findByUserAndSponsorId(user, requestDto.getSponsorId());
		sponsorship.updatePoint(requestDto.getPoint());
		sponsorship.updatePaymentDate(requestDto.getPaymentDate());
		ResponseDto.GetProfileInfo responseDto = ResponseDto.GetProfileInfo.builder()
			.user(user)
			.isConnected(true)
			.build();
		responseDto.updateSponsorshipInfo(sponsorship);
		return responseDto;
	}

	// 정기 후원 종료
	@Override
	public void deleteSponsorship(Long uid, Long sponsorId) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		User sponsor = userRepository.findById(sponsorId)
			.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		if (sponsorshipRepository.countAllByUserAndSponsorId(user, sponsorId) == 0) {
			throw new CustomException(ErrorCode.SPONSORSHIP_NOT_FOUND);
		}
		Sponsorship sponsorship = sponsorshipRepository.findByUserAndSponsorId(user, sponsorId);
		sponsorshipRepository.delete(sponsorship);
	}
}
