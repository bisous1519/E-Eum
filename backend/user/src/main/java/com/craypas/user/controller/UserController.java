package com.craypas.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
	@GetMapping("dream/{uid}")
	public ResponseEntity<?> getDreamFeedUser(@PathVariable final Long uid){
		return new ResponseEntity<>(userService.getDreamFeedUser(uid), HttpStatus.OK);
	}

	// 회원 정보 수정
	@PutMapping("/{uid}")
	public ResponseEntity<?> updateUser(@PathVariable final Long uid, @RequestBody final RequestDto.UpdateUser requestDto){
		return new ResponseEntity<>(userService.updateUser(uid, requestDto), HttpStatus.OK);
	}

	// 비밀번호 재설정
	@PutMapping("/findpw/{uid}")
	public ResponseEntity<?> updatePassword(@PathVariable final Long uid, @RequestBody final String password){
		return new ResponseEntity<>(userService.updatePassword(uid, password), HttpStatus.OK);
	}

	// 회원 탈퇴
	// 회원정보 삭제
	// 포인트 결제
	// 포인트 사용내역 조회
	// 포인트 환불 요청
	// 비밀번호 찾기
	// 이메일 중복 확인
	// 이메일 인증 코드 발송
	// 프로필 사진 업로드
	// 증명 파일 업로드
	// 뱃지 상세 조회
}
