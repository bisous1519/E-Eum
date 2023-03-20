package com.craypas.dream.model.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Support;

import lombok.Getter;
import lombok.ToString;

public class ResponseDto {
	@Getter
	@ToString
	public static class Read {
		@NotNull
		private Long id;
		@NotEmpty
		private String title;
		@NotEmpty
		private String content;
		@NotNull
		private LocalDateTime regTime;
		@NotNull
		private Integer status;
		@NotNull
		private Long userId;

		public Read(Support support) {
			this.id = support.getId();
			this.title = support.getTitle();
			this.content = support.getContent();
			this.regTime = support.getRegTime();
			this.status = support.getStatus();
			this.userId = support.getUserId();
		}
	}
}
