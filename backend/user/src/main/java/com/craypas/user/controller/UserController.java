package com.craypas.user.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.service.EmailService;
import com.craypas.user.model.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
	private final UserService userService;
	private final EmailService emailService;

	// 회원정보 등록
	@PostMapping
	public ResponseEntity<?> createUser(@RequestBody final RequestDto.CreateUser requestDto) {
		return new ResponseEntity<>(userService.createUser(requestDto), HttpStatus.CREATED);
	}

	// 이메일 중복확인 및 인증코드 발송
	@PostMapping("/join")
	@ResponseBody
	String mailConfirm(@RequestParam("email") String email) throws Exception {
		// 중복확인(중복시 예외발생)
		userService.isEmailUnique(email);
		// 인증코드 발송
		String code = emailService.sendSimpleMessage(email);
		System.out.println("인증코드 : " + code);
		return code;
	}

	// 이름 이메일 일치 조회
	@GetMapping("/findpw")
	public ResponseEntity<?> checkNameAndEmail(@RequestParam("name") final String name,
		@RequestParam("email") final String email) {
		return new ResponseEntity<>(userService.checkNameAndEmail(name, email), HttpStatus.OK);
	}

	// 꿈피드 회원정보 조회
	@GetMapping("/dream/{uid}")
	public ResponseEntity<?> getDreamFeedUser(@PathVariable final Long uid) {
		return new ResponseEntity<>(userService.getDreamFeedUser(uid), HttpStatus.OK);
	}

	// 회원 정보 수정
	@PutMapping("/{uid}")
	public ResponseEntity<?> updateUser(@PathVariable final Long uid,
		@RequestBody final RequestDto.UpdateUser requestDto) {
		return new ResponseEntity<>(userService.updateUser(uid, requestDto), HttpStatus.OK);
	}

	// 비밀번호 재설정
	@PutMapping("/findpw/{uid}")
	public ResponseEntity<?> updatePassword(@PathVariable final Long uid,
		@RequestBody final Map<String, String> requestMap) {
		return new ResponseEntity<>(userService.updatePassword(uid, requestMap), HttpStatus.OK);
	}

	// 회원 정보 단일 조회(꿈 후원글)
	@GetMapping("/support/{uid}")
	public ResponseEntity<?> getDreamSupportUser(@PathVariable final Long uid) {
		return new ResponseEntity<>(userService.getDreamSupportUser(uid), HttpStatus.OK);
	}

	// 여러 회원 프로필 사진 조회(후원자)
	@PostMapping("/support")
	public ResponseEntity<?> getDreamSupportSponsor(@RequestBody final String uidList) {
		return new ResponseEntity<>(userService.getDreamSupportSponsor(uidList), HttpStatus.OK);
	}

	// 회원 프리뷰 목록 조회
	@PostMapping("/support/preview")
	public ResponseEntity<?> getUserPreviewList(@RequestBody final String uidList) {
		return new ResponseEntity<>(userService.getUserPreviewList(uidList), HttpStatus.OK);
	}

	// 회원 탈퇴
	@PutMapping("/withdraw/{uid}")
	public ResponseEntity<?> removeUser(@PathVariable final Long uid) {
		userService.removeUser(uid);
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}

	// 회원정보 삭제
	@DeleteMapping("/withdraw/{uid}")
	public ResponseEntity<?> deleteUser(@PathVariable final Long uid) {
		userService.deleteUser(uid);
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}

	// 포인트 구매
	@PutMapping("/point/buy/{uid}")
	public ResponseEntity<?> buyPoint(@PathVariable final Long uid,
		@RequestBody final Map<String, Integer> requestMap) {
		return new ResponseEntity(userService.buyPoint(uid, requestMap), HttpStatus.OK);
	}

	// 포인트 사용
	@PostMapping("/point/use/{uid}")
	public ResponseEntity<?> usePoint(@PathVariable final Long uid,
		@RequestBody final Map<String, Integer> requestMap) {
		return new ResponseEntity<>(userService.usePoint(uid, requestMap), HttpStatus.OK);
	}

	// 포인트 환불
	@PostMapping("/point/refund/{uid}")
	public ResponseEntity<?> refundPoint(@PathVariable final Long uid,
		@RequestBody final Map<String, Integer> requestMap) {
		return new ResponseEntity<>(userService.refundPoint(uid, requestMap), HttpStatus.OK);
	}

	// 포인트 현금화 요청
	@PostMapping("/point/encash/{uid}")
	public ResponseEntity<?> encashPoint(@PathVariable final Long uid) {
		return new ResponseEntity<>(userService.encashPoint(uid), HttpStatus.CREATED);
	}

	// 포인트 초기화
	@PutMapping("/point/init/{uid}")
	public ResponseEntity<?> initPoint(@PathVariable final Long uid) {
		return new ResponseEntity<>(userService.initPoint(uid), HttpStatus.OK);
	}

	// 프로필 사진 업로드
	@PutMapping("/profile/{uid}")
	public ResponseEntity<?> updateImage(@PathVariable final Long uid, @RequestBody final MultipartFile image) {
		return new ResponseEntity<>(userService.updateImage(uid, image), HttpStatus.OK);
	}

	// 증명 파일 업로드
	@PutMapping("/certificate/{uid}")
	public ResponseEntity<?> updateCertificateFile(@PathVariable final Long uid,
		@RequestBody final MultipartFile file) {
		return new ResponseEntity<>(userService.updateCertificateFile(uid, file), HttpStatus.OK);
	}

	// 해류병 발송시 수신 회원 조회
	@GetMapping("/random/{uid}")
	public ResponseEntity<?> getRandomUserList(@PathVariable final Long uid) {
		return new ResponseEntity<>(userService.getRandomUserList(uid), HttpStatus.OK);
	}

	// 뱃지 획득 정보 생성
	@PostMapping("/badge/{uid}")
	public ResponseEntity<?> createUserBadge(@PathVariable final Long uid, @RequestParam("bid") final Long bid) {
		return new ResponseEntity<>(userService.createUserBadge(uid, bid), HttpStatus.CREATED);
	}

	// 뱃지 상세 조회
	@GetMapping("/badge/{uid}")
	public ResponseEntity<?> getBadgeList(@PathVariable final Long uid) {
		return new ResponseEntity<>(userService.getBadgeList(uid), HttpStatus.OK);
	}
}
