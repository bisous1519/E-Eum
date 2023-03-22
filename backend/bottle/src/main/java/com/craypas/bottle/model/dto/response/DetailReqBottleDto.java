package com.craypas.bottle.model.dto.response;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class DetailReqBottleDto {
	private Long id;
	private String content;
	private Integer type;
	private Integer sentiment;
	private Date regTime;
	private Integer status;
	private List<ResBottleDto> resBottles;

	@QueryProjection
	public DetailReqBottleDto(long id, String content, int type, int sentiment, Date regTime, int status, List<ResBottleDto> resBottles) {
		this.id = id;
		this.content = content;
		this.type = type;
		this.sentiment = sentiment;
		this.regTime = regTime;
		this.status = status;
		this.resBottles = resBottles;
	}

	public String castToString(Date time){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(time);
	}
}
