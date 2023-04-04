package com.craypas.bottle.model.dto.request;

import javax.validation.constraints.NotNull;

import com.craypas.bottle.model.entity.ReqBottle;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CreateReqBottleDto {

	@NotNull
	private Long writerId;
	@NotNull
	private String content;
	private String ttsPath;
	@NotNull
	private Integer type;
	private Integer sentiment;

	public ReqBottle toEntity() {
		return ReqBottle.builder()
			.writerId(writerId)
			.content(content)
			.ttsPath(ttsPath)
			.type(type)
			.sentiment(sentiment)
			.build();
	}
}
