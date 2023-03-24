package com.craypas.bottle.model.dto.response;

import com.craypas.bottle.model.entity.UserReqBottle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatedUserReqBottleDto {
	private Long receiverId;

	public UserReqBottle toEntity() {
		return UserReqBottle.builder()
			.receiverId(receiverId)
			.build();
	}
}
