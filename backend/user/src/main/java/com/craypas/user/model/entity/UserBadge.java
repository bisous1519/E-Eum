package com.craypas.user.model.entity;

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
@Entity
@NoArgsConstructor
@Table(name = "user_badge")
public class UserBadge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "badge_id")
	private Badge badge;

	@Column(name = "reg_time")
	private LocalDateTime regTime;

	@Builder
	public UserBadge(Long id, User user, Badge badge, LocalDateTime regTime) {
		this.id = id;
		this.user = user;
		this.badge = badge;
		this.regTime = regTime;
	}
}
