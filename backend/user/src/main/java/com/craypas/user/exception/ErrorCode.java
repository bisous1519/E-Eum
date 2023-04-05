package com.craypas.user.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

	INVALID_INPUT(HttpStatus.BAD_REQUEST, "INVALID INPUT"),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR"),
	USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "회원이 존재하지 않습니다."),
	EMAIL_ALREADY_EXIST(HttpStatus.BAD_REQUEST, "이미 가입되어 있는 이메일입니다."),
	SPONSORSHIP_NOT_FOUND(HttpStatus.BAD_REQUEST, "후원 정보가 존재하지 않습니다."),
	NOT_ENOUGH_POINT(HttpStatus.BAD_REQUEST, "회원이 보유한 포인트가 부족합니다."),
	BADGE_NOT_FOUND(HttpStatus.BAD_REQUEST, "뱃지가 존재하지 않습니다."),
	USER_BADGE_ALREADY_EXIST(HttpStatus.BAD_REQUEST, "이미 획득한 뱃지입니다."),
	EMAIL_NOT_FOUND(HttpStatus.BAD_REQUEST, "등록된 사용자 정보가 없습니다."),
	LOGIN_FAILED(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
	EMAIL_IS_NULL(HttpStatus.BAD_REQUEST, "이메일 값이 정상적으로 들어오지 않았습니다.");

	private HttpStatus httpStatus;
	private String message;
}

