package com.craypas.bottle.model.dto.response;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.google.type.DateTime;
import com.querydsl.core.annotations.QueryProjection;

import lombok.ToString;

@ToString
public class ResBottleDto {
	private Long id;
	private Long userNickname;
	private List<UserBadgeDto> userBadges;
	private String content;
	private Date regTime;
	private Integer status;

	@QueryProjection
	public ResBottleDto(long id, String content, Date regTime, int status) {
		this.id = id;
		this.content = content;
		this.regTime = regTime;
		this.status = status;
	}

	public String stringConverter(DateTime input){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(input);
	}
}
