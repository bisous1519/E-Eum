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
@Table(name = "tag")
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_id")
	private Long userId;

	@Column(name = "name")
	private String name;

	@Column(name = "reg_time")
	private LocalDateTime regTime;

	@Builder
	public Tag(Long id, Long userId, String name, LocalDateTime regTime) {
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.regTime = regTime;
	}

	public void update(String name){
		this.name = name;
	}
}
