package com.craypas.dream.model.dto.record;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Record;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class ResponseDto {
	@Getter
	@NoArgsConstructor
	@ToString
	public static class Read {
		@NotNull
		private Long id;
		@NotEmpty
		private String content;
		@NotNull
		private LocalDateTime regTime;
		@NotNull
		private Long writerId;

		public Read(Record record) {
			this.id = record.getId();
			this.content = record.getContent();
			this.regTime = record.getRegTime();
			this.writerId = record.getWriterId();
		}
	}
}
