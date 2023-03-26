package com.craypas.bottle.model.dto.response;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatedReportDto {
	private Long id;
	private Integer type;
	private long targetId;
	private String content;
	private String regTime;
	// 0 : 신고 요청 상태, 1 : 신고 승인 상태
	private Integer status;
}
