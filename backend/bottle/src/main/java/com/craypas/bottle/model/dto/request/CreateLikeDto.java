package com.craypas.bottle.model.dto.request;

import javax.validation.constraints.NotNull;

import com.craypas.bottle.model.entity.Like;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CreateLikeDto {

	@NotNull
	private Long userId;

	private Long resBottleId;

	public Like toEntity() {
		return Like.builder().userId(userId).resBottleId(resBottleId).build();
	}
}
