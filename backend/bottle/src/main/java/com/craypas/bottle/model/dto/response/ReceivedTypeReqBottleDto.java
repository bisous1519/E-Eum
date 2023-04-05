package com.craypas.bottle.model.dto.response;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
public class ReceivedTypeReqBottleDto {
	private long id;
	private long userReqBottleId;
	private long writerId;
	private String content;
	private int sentiment;
	private String ttsPath;
	private String regTime;
	private int status;
	private boolean receiverRead;

	@QueryProjection
	public ReceivedTypeReqBottleDto (long id, long userReqBottleId, long writerId, String content, int sentiment, String ttsPath, String regTime, int status, boolean receiverRead) {
		this.id = id;
		this.userReqBottleId = userReqBottleId;
		this.writerId = writerId;
		this.content = content;
		this.sentiment = sentiment;
		this.ttsPath = ttsPath;
		this.regTime = regTime;
		this.status = status;
		this.receiverRead = receiverRead;
	}
}
