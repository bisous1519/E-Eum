package com.craypas.dream.model.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Support;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class RequestDto {
	@Getter
	@NoArgsConstructor
	@ToString
	public static class Create {
		@NotEmpty
		private String title;
		@NotEmpty
		private String content;
		@NotNull
		private Long userId;

		public Support toEntity() {
			return Support.builder()
				.title(this.title)
				.content(this.content)
				.userId(this.userId)
				.regTime(LocalDateTime.now())
				.status(0)
				.build();
		}
	}
}
