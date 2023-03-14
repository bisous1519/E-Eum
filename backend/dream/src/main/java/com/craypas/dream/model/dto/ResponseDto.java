package com.craypas.dream.model.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Record;

import lombok.Getter;

public class ResponseDto {
	@Getter
	public static class Read {
		@NotEmpty
		private Long id;
		@NotNull
		private String content;
		@NotEmpty
		private LocalDateTime regDate;
		@NotEmpty
		private Long writerId;

		public Read(Record record) {
			this.id = record.getId();
			this.content = record.getContent();
			this.regDate = record.getRegDate();
			this.writerId = record.getWriterId();
		}
	}
}
