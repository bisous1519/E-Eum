package com.craypas.bottle.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

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

	@Column(name = "user_req_bottle_id")
	private long userReqBottleId;

	@Column(name = "content")
	private String content;

	@Column(name = "tts_path")
	private String ttsPath;

	@Column(name = "sentiment")
	private int sentiment;

	@Column(name = "reg_time")
	@CreationTimestamp
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date regTime;

	@Column(name = "status")
	private int status;
}
