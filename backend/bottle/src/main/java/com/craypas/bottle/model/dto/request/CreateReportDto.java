package com.craypas.bottle.model.dto.request;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.craypas.bottle.model.entity.Report;
import com.google.firebase.database.core.Repo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateReportDto {
	// 1 : req_bottle, 2 : res_bottle, 3 : support, 4: record
	@NotNull
	private Integer type;

	@NotNull
	private Long targetId;

	@NotEmpty
	private String content;

	// 0 : 신고 요청 상태, 1 : 신고 승인 상태
	private Integer status;

	public Report toEntity() {
		return Report.builder()
			.type(type)
			.targetId(targetId)
			.content(content)
			.status(status)
			.build();
	}
}
