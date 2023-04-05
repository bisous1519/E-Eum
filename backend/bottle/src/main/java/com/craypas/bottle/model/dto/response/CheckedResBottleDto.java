package com.craypas.bottle.model.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CheckedResBottleDto {
	private Long id;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Long resWriterId;
	private String userNickname;
	private List<BadgeDto> badges;
	private String content;
	private String ttsPath;
	private String regTime;
	private Integer status;
	private CreatedLikeDto likeDto;

	@QueryProjection
	public CheckedResBottleDto(long id, long resWriterId, String content, String ttsPath, String regTime, int status) {
		this.id = id;
		this.resWriterId = resWriterId;
		this.content = content;
		this.ttsPath = ttsPath;
		this.regTime = regTime;
		this.status = status;
	}
}
