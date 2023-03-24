package com.craypas.dream.model.dto.tag;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.dream.model.entity.Tag;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class RequestDto {
	@Getter
	@NoArgsConstructor
	@ToString
	public static class Create {
		@NotNull
		private Long uid;
		@NotEmpty
		private String name;

		public Tag toEntity() {
			return Tag.builder()
				.userId(uid)
				.name(name)
				.regTime(LocalDateTime.now())
				.build();
		}
	}
}
