package com.craypas.bottle.model.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import com.craypas.bottle.model.dto.request.ReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.ResBottleDto;
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
@Entity(name = "res_bottle")
public class ResBottle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "user_bottle_id")
	private long userBottleId;

	@Column(name = "content")
	private String content;

	@Column(name = "sentiment")
	private int sentiment;

	@Column(name = "reg_time")
	@CreationTimestamp
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date regTime;

	@Column(name = "status")
	private int status;
}
