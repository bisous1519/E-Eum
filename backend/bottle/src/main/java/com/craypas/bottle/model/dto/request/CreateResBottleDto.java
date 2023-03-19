package com.craypas.bottle.model.dto.request;

import java.text.ParseException;

import javax.validation.constraints.NotEmpty;

import com.craypas.bottle.model.entity.ReqBottle;

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
	private Long writerId;

	private Long bottieId;

	@NotEmpty
	private String content;

	@NotEmpty
	private Integer type;

	private Integer sentiment;


	public ReqBottle toEntity() throws ParseException {
		return ReqBottle.builder()
			.writerId(writerId)
			.content(content)
			.type(type)
			.content(content)
			.sentiment(sentiment)
			.build();
	}
}
