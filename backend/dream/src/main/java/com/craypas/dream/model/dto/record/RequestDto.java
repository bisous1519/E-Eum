package com.craypas.dream.model.dto.record;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.dream.model.entity.Record;
import com.craypas.dream.model.entity.Tag;

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
		@NotNull
		private Long tid;
		private MultipartFile image;

		public Record toEntity(Tag tag, String imagePath) {
			return Record.builder()
				.content(this.content)
				.regTime(LocalDateTime.now())
				.writerId(this.writerId)
				.tag(tag)
				.imagePath(imagePath)
				.build();
		}
	}
}
