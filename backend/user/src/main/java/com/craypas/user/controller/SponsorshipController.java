package com.craypas.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.dto.user.ResponseDto;
import com.craypas.user.model.service.SponsorshipService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user/sponsorship")
public class SponsorshipController {
	private final SponsorshipService sponsorshipService;

	// 정기 후원 시작
	@PostMapping
	public ResponseEntity<?> createSponsorship(@RequestBody final RequestDto.CreateSponsorship requestDto) {
		return new ResponseEntity<>(sponsorshipService.createSponsorship(requestDto), HttpStatus.CREATED);
	}

	// 정기 후원 정보 조회
	@GetMapping
	public ResponseEntity<?> readSponsorship(@RequestParam("uid") final Long uid,
		@RequestParam("sponsorId") final Long sponsorId) {
		return new ResponseEntity<>(sponsorshipService.readSponsorship(uid, sponsorId), HttpStatus.OK);
	}

	// 정기 후원 결제 실행
	@PutMapping("/payment")
	public ResponseEntity<?> paySponsorshipPoint(@RequestParam("uid") final Long uid,
		@RequestParam("sponsorId") final Long sponsorId) {
		return new ResponseEntity<>(sponsorshipService.paySponsorshipPoint(uid, sponsorId), HttpStatus.OK);
	}

	// 정기 후원 정보 수정
	@PutMapping
	public ResponseEntity<?> updateSponsorship(@RequestBody final RequestDto.CreateSponsorship requestDto) {
		return new ResponseEntity<>(sponsorshipService.updateSponsorship(requestDto), HttpStatus.OK);
	}

	// 정기 후원 종료
	@DeleteMapping
	public ResponseEntity<?> deleteSponsorship(@RequestParam("uid") final Long uid,
		@RequestParam("sponsorId") final Long sponsorId) {
		sponsorshipService.deleteSponsorship(uid, sponsorId);
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
}
