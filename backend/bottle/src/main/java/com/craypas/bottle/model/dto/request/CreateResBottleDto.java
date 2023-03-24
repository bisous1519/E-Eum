package com.craypas.bottle.model.dto.request;

import javax.validation.constraints.NotEmpty;

import com.craypas.bottle.model.entity.ResBottle;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CreateResBottleDto {

	@NotEmpty
	private Long userBottleId;

	@NotEmpty
	private String content;

	private Integer sentiment;

	public ResBottle toEntity() {
		return ResBottle.builder()
			.userReqBottleId(userBottleId)
			.content(content)
			.sentiment(sentiment)
			.build();
	}
}
