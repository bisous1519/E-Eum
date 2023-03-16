package com.craypas.dream.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.craypas.dream.model.service.SupportService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/support")
public class SupportController {
	private final SupportService supportService;

	public SupportController(SupportService supportService) {
		this.supportService = supportService;
	}

	// 꿈 후원요청 작성
	@PostMapping("/req")
	public ResponseEntity<?> createSupport(@RequestBody ){
		return new ResponseEntity<>();
	}

	// 꿈 후원요청 단일 조회
	// 꿈 후원요청 전체 조회
	// 꿈 후원요청 수정
	// 꿈 후원요청 삭제
	// 꿈 후원하기
	// 꿈 후원 취소하기
	// 꿈 후원요청 검색
	// 사진 업로드(?)



}
