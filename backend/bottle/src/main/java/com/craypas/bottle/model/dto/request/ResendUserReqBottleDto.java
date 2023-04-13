package com.craypas.bottle.model.dto.request;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResendUserReqBottleDto {

	@NotEmpty
	Long reqBottleWriterId;
	@NotEmpty
	Long userId;
	@NotEmpty
	Integer reqBottleType;
}
