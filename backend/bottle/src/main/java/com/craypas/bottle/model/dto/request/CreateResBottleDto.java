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

	private Long userReqBottleId;
	@NotEmpty
	private String content;
	private String ttsPath;

	public ResBottle toEntity() {
		return ResBottle.builder()
			.userReqBottleId(userReqBottleId)
			.content(content)
			.ttsPath(ttsPath)
			.build();
	}
}
