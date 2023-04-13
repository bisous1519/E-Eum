package com.craypas.bottle.model.dto.response;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class LateUserReqBottleDto {
	private Long id;
	private Long reqBottleId;
	private Long reqWriterId;
	private int type;
	private Long receiverId;
	private CreatedResBottleDto resBottleDto;

	@QueryProjection
	public LateUserReqBottleDto(long id, long reqBottleId, long reqWriterId, long receiverId, int type, CreatedResBottleDto resBottleDto) {
		this.id = id;
		this.reqBottleId = reqBottleId;
		this.reqWriterId = reqWriterId;
		this.receiverId = receiverId;
		this.type = type;
		this.resBottleDto = resBottleDto;
	}
}
