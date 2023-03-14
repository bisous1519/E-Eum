package com.craypas.bottle.model.dto.request;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.craypas.bottle.model.entity.Bottle;

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
public class BottleDto {
	private Long id;
	private Long writerId;
	private Long bottieId;
	private String content;
	private Integer type;
	private Integer color;
	private String regTime;
	private Integer status;

	public Bottle toEntity() throws ParseException {
		return Bottle.builder()
			.id(id)
			.writerId(writerId)
			.bottieId(bottieId)
			.content(content)
			.type(type)
			.content(content)
			.color(color)
			.regTime(dateConverter(regTime))
			.status(status).build();
	}

	public Date dateConverter(String input) throws ParseException {
		SimpleDateFormat foramatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return foramatter.parse(input);
	}
}
