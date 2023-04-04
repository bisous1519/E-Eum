package com.craypas.bottle.model.dto.response;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.craypas.bottle.model.entity.ReqBottle;
import com.querydsl.core.annotations.QueryProjection;

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
public class CreatedReqBottleDto {
	private long id;
	private long writerId;
	private String content;
	private int sentiment;
	private String ttsPath;
	private String regTime;
	private int status;
	private boolean read;
	private boolean resRead;

	@QueryProjection
	public CreatedReqBottleDto (long id, long writerId, String content, int sentiment, String ttsPath, String regTime, int status) {
		this.id = id;
		this.writerId = writerId;
		this.content = content;
		this.sentiment = sentiment;
		this.ttsPath = ttsPath;
		this.regTime = regTime;
		this.status = status;
	}

	public ReqBottle toEntity() throws ParseException {
		return ReqBottle.builder()
			.id(id)
			.writerId(writerId)
			.content(content)
			.sentiment(sentiment)
			.ttsPath(ttsPath)
			.regTime(dateConverter(regTime))
			.status(status)
			.read(read)
			.resRead(resRead)
			.build();
	}

	public Date dateConverter(String input) throws ParseException {
		SimpleDateFormat foramatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = foramatter.parse(input);
		return date;
	}
}
