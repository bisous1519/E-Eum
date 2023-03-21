package com.craypas.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.craypas.user.model.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
	private final UserService userService;

	// 회원정보 등록
	@PostMapping
	public ResponseEntity<?> createUser(){
		return new ResponseEntity<>("SUCCESS",HttpStatus.CREATED);
	}

	// 회원정보 조회
	@GetMapping("/{uid}")
	public ResponseEntity<?> getUser(){
		// return new ResponseEntity<>()
	}

	// 회원정보 수정
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
