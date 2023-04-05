package com.craypas.bottle.model.entity;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;

import com.craypas.bottle.model.dto.response.ReceivedUserReqBottleDto;
import com.craypas.bottle.model.dto.response.ReceivedUserResBottleDto;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "user_req_bottle")
@ToString
public class UserReqBottle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "req_bottle_id")
	private ReqBottle reqBottle;

	@Column(name="receiver_id")
	private long receiverId;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_req_bottle_id")
	private List<ResBottle> resBottles;

	@Column(name="is_read")
	private boolean receiverRead;

	@Column(name="reg_time")
	@CreationTimestamp
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date regTime;

	public ReceivedUserReqBottleDto toCreatedReqDto() {
		return ReceivedUserReqBottleDto.builder().userReqBottleId(id).reqBottle(reqBottle.toCreatedDto()).build();
	}

	public ReceivedUserResBottleDto toCreatedResDto() {
		return ReceivedUserResBottleDto.builder().user_req_bottle_id(id).resBottles(
			resBottles.stream().map(ResBottle::toCreatedDto).collect(Collectors.toList())
		).build();
	}

	public void updateReceiverRead(boolean receiverRead) {
		this.receiverRead = receiverRead;
	}
}
