package com.craypas.bottle.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatedUserReqBottleDto {
	private long id;
	private long reqBottleId;
	private long receiverId;
	private boolean receiverRead;
	private String regTime;
}
