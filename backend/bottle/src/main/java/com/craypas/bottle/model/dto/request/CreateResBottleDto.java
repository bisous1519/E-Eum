package com.craypas.bottle.model.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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

	@NotNull
	private Long userReqBottleId;

	@NotEmpty
	private String content;

	private String ttsPath;

	private Integer sentiment;

	public ResBottle toEntity() {
		return ResBottle.builder()
			.userReqBottleId(userReqBottleId)
			.content(content)
			.ttsPath(ttsPath)
			.sentiment(sentiment)
			.build();
	}
}
