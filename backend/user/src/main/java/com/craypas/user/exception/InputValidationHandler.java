package com.craypas.user.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class InputValidationHandler {
	// Dto 유효성 검증
	@ExceptionHandler(MethodArgumentNotValidException.class)
	protected ResponseEntity<Object> handleDtoNotValid(MethodArgumentNotValidException e) {
		e.printStackTrace();
		return new ResponseEntity<>(ErrorCode.INVALID_INPUT.getMessage(), ErrorCode.INVALID_INPUT.getHttpStatus());
	}

	// DB에 데이터가 존재하지 않음
	@ExceptionHandler(CustomException.class)
	protected ResponseEntity<Object> dataNotFound(CustomException e) {
		e.printStackTrace();
		return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
	}
}
