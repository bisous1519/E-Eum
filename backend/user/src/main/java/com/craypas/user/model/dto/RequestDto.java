package com.craypas.user.model.dto;

import java.time.LocalDateTime;

import lombok.Getter;

public class RequestDto {
	@Getter
	public static class CreateUser {
		private String name;
		private String email;
		private String nickname;
		private Integer gender;
		private String imagePath;
		private Integer type;
		private Integer point;
		private LocalDateTime regTime;
		private Integer status;
	}

	@Getter
	public static class UpdateUser {
		// private String nickname
	}
}
