package com.craypas.dream.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

	INVALID_INPUT(HttpStatus.BAD_REQUEST, "INVALID INPUT"),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR"),
	SUPPORT_NOT_FOUND(HttpStatus.BAD_REQUEST, "후원글이 존재하지 않습니다."),
	SUPPORT_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "후원내역이 존재하지 않습니다."),
	RECORD_NOT_FOUND(HttpStatus.BAD_REQUEST, "꿈 기록이 존재하지 않습니다.");

	private HttpStatus httpStatus;
	private String message;
}


