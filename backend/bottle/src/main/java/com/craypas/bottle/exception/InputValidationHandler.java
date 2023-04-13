package com.craypas.bottle.exception;
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
}
