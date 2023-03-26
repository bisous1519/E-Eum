package com.craypas.bottle.model.dto.response;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class CreatedResBottleDto {
	private long id;
	private long userReqBottleId;
	private String content;
	private int sentiment;
	private String ttsPath;
	private String regTime;
	private int status;

	@QueryProjection
	public CreatedResBottleDto(long id, long userReqBottleId, String content, int sentiment, String ttsPath, String regTime, int status) {
		this.id = id;
		this.userReqBottleId = userReqBottleId;
		this.content = content;
		this.sentiment = sentiment;
		this.ttsPath = ttsPath;
		this.regTime = regTime;
		this.status = status;
	}
}
