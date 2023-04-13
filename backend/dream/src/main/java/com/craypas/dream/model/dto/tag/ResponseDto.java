package com.craypas.dream.model.dto.tag;

import com.craypas.dream.model.entity.Tag;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class ResponseDto {
	@Getter
	@NoArgsConstructor
	@ToString
	public static class Read {
		private Long id;
		private String name;

		public Read(Tag tag) {
			this.id = tag.getId();
			this.name = tag.getName();
		}
	}
}
