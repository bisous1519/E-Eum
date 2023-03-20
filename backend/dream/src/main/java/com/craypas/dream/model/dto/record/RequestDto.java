package com.craypas.dream.model.dto.record;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Record;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class RequestDto {
	@Getter
	@NoArgsConstructor
	@ToString
	public static class Create {
		@NotEmpty
		private String content;
		@NotNull
		private Long writerId;

		public Record toEntity() {
			return Record.builder()
				.content(this.content)
				.regTime(LocalDateTime.now())
				.writerId(this.writerId)
				.build();
		}
	}
}
