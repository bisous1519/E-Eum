package com.craypas.bottle.model.dto.request;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.craypas.bottle.model.entity.ReqBottle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ReqBottleDto {
	private Long id;
	private Long writerId;
	private String content;
	private Integer type;
	private Integer sentiment;
	private String regTime;
	private Integer status;

	public ReqBottle toEntity() throws ParseException {
		return ReqBottle.builder()
			.id(id)
			.writerId(writerId)
			.content(content)
			.type(type)
			.content(content)
			.sentiment(sentiment)
			.regTime(dateConverter(regTime))
			.status(status).build();
	}

	public Date dateConverter(String input) throws ParseException {
		SimpleDateFormat foramatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return foramatter.parse(input);
	}
}
