package com.craypas.dream.model.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Support;

public class ResponseDto {
	public static class Read {
		@NotEmpty
		private Long id;
		@NotEmpty
		private String title;
		@NotNull
		private String content;
		@NotEmpty
		private LocalDateTime regDate;
		@NotEmpty
		private Integer status;
		@NotEmpty
		private Long userId;

		public Read(Support support) {
			this.id = support.getId();
			this.title = support.getTitle();
			this.content = support.getContent();
			this.regDate = support.getRegDate();
			this.status = support.getStatus();
			this.userId = support.getUserId();
		}
	}
}
