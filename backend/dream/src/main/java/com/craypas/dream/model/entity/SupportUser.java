package com.craypas.dream.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "support_user")
public class SupportUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "support_id")
	private Support support;

	@Column(name = "writer_id")
	private Long writerId;

	@Column(name = "point")
	private Integer point;

	@Column(name = "reg_time")
	private LocalDateTime regTime;

	@Builder
	public SupportUser(Long id, Support support, Long writerId, Integer point, LocalDateTime regTime) {
		this.id = id;
		this.support = support;
		this.writerId = writerId;
		this.point = point;
		this.regTime = regTime;
	}

	public void updatePoint(Integer point) {
		this.point += point;
	}
}
