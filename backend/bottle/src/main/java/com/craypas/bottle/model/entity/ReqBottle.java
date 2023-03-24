package com.craypas.bottle.model.entity;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import com.craypas.bottle.model.dto.request.CreateResBottleDto;
import com.craypas.bottle.model.dto.request.ReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedUserReqBottleDto;
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
@Entity(name = "req_bottle")
@DynamicUpdate
public class ReqBottle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "writer_id")
	private long writerId;

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

	@OneToMany(mappedBy = "reqBottle", cascade = CascadeType.ALL)
	private List<UserReqBottle> userReqBottles = new ArrayList<>();

	public CreatedReqBottleDto toCreatedDto() {
		List<CreatedUserReqBottleDto> userReqBottleDtos = new ArrayList<>();
		if(!userReqBottles.isEmpty()) {
			userReqBottleDtos = userReqBottles.stream()
				.map(UserReqBottle::toCreatedDto).collect(Collectors.toList());
		}
		return CreatedReqBottleDto.builder()
			.id(id)
			.writerId(writerId)
			.content(content)
			.type(type)
			.sentiment(sentiment)
			.regTime(stringConverter(regTime))
			.status(status)
			.receivers(userReqBottleDtos)
			.build();
	}

	public SummaryBottleDto toSummaryBottleDto() {
		return SummaryBottleDto.builder()
			.id(id)
			.content(content)
			.type(type)
			.sentiment(sentiment)
			.regTime(stringConverter(regTime))
			.build();
	}

	public void updateUserReqBottles(List<UserReqBottle> userReqBottles) {
		this.userReqBottles = userReqBottles;
	}

	public String stringConverter(Date input){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(input);
	}
}
