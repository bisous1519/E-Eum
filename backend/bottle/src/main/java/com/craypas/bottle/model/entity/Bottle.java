package com.craypas.bottle.model.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import com.craypas.bottle.model.dto.request.BottleDto;
import com.craypas.bottle.model.dto.response.CreatedBottleDto;
import com.craypas.bottle.model.dto.response.SummaryBottleDto;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "bottle")
@DynamicUpdate
public class Bottle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "writer_id")
	private long writerId;

	@Column(name = "bottle_id")
	private long bottieId;

	@Column(name = "content")
	private String content;

	@Column(name = "type")
	private int type;

	@Column(name = "sentiment")
	private int sentiment;

	@Column(name = "reg_time")
	@CreationTimestamp
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date regTime;

	@Column(name = "status")
	private int status;

	public BottleDto toDto() {
		return BottleDto.builder()
			.id(id)
			.writerId(writerId)
			.bottieId(bottieId)
			.content(content)
			.type(type)
			.content(content)
			.sentiment(sentiment)
			.regTime(stringConverter(regTime))
			.status(status).build();
	}

	public CreatedBottleDto toCreatedDto() {
		return CreatedBottleDto.builder()
			.id(id)
			.writerId(writerId)
			.bottieId(bottieId)
			.content(content)
			.type(type)
			.sentiment(sentiment)
			.regTime(stringConverter(regTime))
			.status(status)
			.build();
	}

	public String stringConverter(Date input){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(input);
	}
}
