package com.craypas.dream.model.dto.record;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.dream.model.entity.Record;

import lombok.AllArgsConstructor;
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
		@NotEmpty
		private String tagName;
		// private MultipartFile image;

		public Read(Record record) {
			this.id = record.getId();
			this.content = record.getContent();
			this.regTime = record.getRegTime();
			this.writerId = record.getWriterId();
			this.tagName = record.getTag().getName();
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@ToString
	public static class Feed {
		private Integer recordCnt;
		private List<LocalDate> dateList;
		private List<ArrayList<Read>> recordList;
	}

}
