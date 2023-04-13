package com.craypas.bottle.model.dto.response;

import com.querydsl.core.annotations.QueryProjection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceivedUserReqBottleDto {

	private Long userReqBottleId;
	private CreatedReqBottleDto reqBottle;
}
