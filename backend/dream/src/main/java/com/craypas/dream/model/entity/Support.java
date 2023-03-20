package com.craypas.dream.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "support")
public class Support {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "reg_time")
	private LocalDateTime regTime;

	@Column(name = "status")
	private Integer status;

	@Column(name = "user_id")
	private Long userId;

	@Builder
	public Support(Long id, String title, String content, LocalDateTime regTime, Integer status, Long userId) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.regTime = regTime;
		this.status = status;
		this.userId = userId;
	}

	public void update(String title, String content){
		this.title = title;
		this.content = content;
	}

	public void done(){
		this.status = 1;
	}
}
