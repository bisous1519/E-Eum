package com.craypas.bottle.model.dto.response;

import java.util.List;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CheckedResBottleDto {
	private Long id;
	private Long userNickname;
	private List<UserBadgeDto> userBadges;
	private String content;
	private String ttsPath;
	private String regTime;
	private Integer status;
	private CreatedLikeDto likeDto;

	@QueryProjection
	public CheckedResBottleDto(long id, String content, String ttsPath, String regTime, int status) {
		this.id = id;
		this.content = content;
		this.ttsPath = ttsPath;
		this.regTime = regTime;
		this.status = status;
	}
}
