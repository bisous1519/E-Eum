package com.craypas.bottle.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class SummaryBottleDto {
	private Long id;
	private String content;
	private Integer type;
	private Integer sentiment;
	private String regTime;
}
