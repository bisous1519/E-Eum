package com.craypas.bottle.model.dto.response;

import org.checkerframework.checker.units.qual.A;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CreatedLikeDto {
	private Long id;
	private Long userId;
	private Long resBottleId;
}
