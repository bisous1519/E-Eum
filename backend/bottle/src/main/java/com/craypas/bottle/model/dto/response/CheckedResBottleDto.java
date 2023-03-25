package com.craypas.bottle.model.dto.response;

import java.util.List;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

@Getter
public class CheckedResBottleDto {
	private Long id;
	private Long userNickname;
	private List<UserBadgeDto> userBadges;
	private String content;
	private String regTime;
	private Integer status;

	@QueryProjection
	public CheckedResBottleDto(long id, String content, String regTime, int status) {
		this.id = id;
		this.content = content;
		this.regTime = regTime;
		this.status = status;
	}
}
