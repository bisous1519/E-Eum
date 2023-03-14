package com.craypas.dream.model.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Record;

import lombok.Getter;

public class RequestDto {
	@Getter
	public static class Create {
		@NotNull
		private String content;
		@NotEmpty
		private Long writerId;

		public Record toEntity() {
			return Record.builder()
				.content(this.content)
				.regDate(LocalDateTime.now())
				.writerId(this.writerId)
				.build();
		}
	}
}
