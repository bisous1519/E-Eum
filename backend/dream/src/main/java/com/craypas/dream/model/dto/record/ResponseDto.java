package com.craypas.dream.model.dto.record;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Record;

import lombok.Getter;

public class ResponseDto {
	@Getter
	public static class Read {
		@NotNull
		private Long id;
		@NotEmpty
		private String content;
		@NotNull
		private LocalDateTime regDate;
		@NotNull
		private Long writerId;

		public Read(Record record) {
			this.id = record.getId();
			this.content = record.getContent();
			this.regDate = record.getRegDate();
			this.writerId = record.getWriterId();
		}
	}
}
