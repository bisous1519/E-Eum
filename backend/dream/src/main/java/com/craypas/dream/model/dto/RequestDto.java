package com.craypas.dream.model.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;

import com.craypas.dream.model.entity.Support;
import com.sun.istack.NotNull;

import lombok.Getter;

public class RequestDto {
	@Getter
	public static class Create {
		@NotEmpty
		private String title;
		@NotNull
		private String content;
		@NotEmpty
		private Long userId;

		public Support toEntity() {
			return Support.builder()
				.title(this.title)
				.content(this.content)
				.userId(this.userId)
				.regTime(LocalDateTime.now())
				.build();
		}
	}
}
