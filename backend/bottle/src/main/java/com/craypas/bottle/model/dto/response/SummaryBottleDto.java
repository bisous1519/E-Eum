package com.craypas.bottle.model.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class SummaryBottleDto {
	private Long id;
	private String content;
	private Integer type;
	private Integer sentiment;
	private String regTime;
	private Integer resCnt;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private List<CheckedResBottleDto> resBottles;

	@QueryProjection
	public SummaryBottleDto(long id, String content, int type, int sentiment, String regTime, int resCnt, List<CheckedResBottleDto> resBottles) {
		this.id = id;
		this.content = content;
		this.type = type;
		this.sentiment = sentiment;
		this.regTime = regTime;
		this.resCnt = resCnt;
		this.resBottles = resBottles;
	}
}
