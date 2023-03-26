package com.craypas.bottle.model.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import com.craypas.bottle.model.dto.response.CreatedReportDto;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "report")
public class Report {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	// 1 : req_bottle, 2 : res_bottle, 3 : support, 4: record
	@Column(name = "type")
	private int type;

	@Column(name = "target_id")
	private long targetId;

	@Column(name = "content")
	private String content;

	@Column(name = "reg_time")
	@CreationTimestamp
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date regTime;

	// 0 : 신고 요청 상태, 1 : 신고 승인 상태
	@Column(name = "status")
	private int status;

	public CreatedReportDto toCreatedDto() {
		return CreatedReportDto.builder()
			.id(id)
			.type(type)
			.targetId(targetId)
			.content(content)
			.regTime(stringConverter(regTime))
			.status(status)
			.build();
	}

	public String stringConverter(Date input){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(input);
	}
}
