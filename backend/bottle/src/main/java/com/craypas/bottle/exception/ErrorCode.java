package com.craypas.bottle.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

	INVALID_INPUT(HttpStatus.BAD_REQUEST, "유효하지 않은 입력입니다."),
	BOTTLE_NOT_FOUND(HttpStatus.BAD_REQUEST, "해류병이 존재하지 않습니다."),
	USER_REQ_BOTTLE_NOT_FOUND(HttpStatus.BAD_REQUEST, "질문 해류병이 존재하지 않습니다."),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러");

	private HttpStatus httpStatus;
	private String message;
}
