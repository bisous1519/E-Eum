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
@Table(name = "sponsorship")
public class Sponsorship {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "sponsor_id")
	private Long sponsorId;

	@Column(name = "reg_time")
	private LocalDateTime regTime;

	@Column(name = "point")
	private Integer point;

	@Column(name = "count_payment")
	private Integer countPayment;

	@Column(name = "payment_date")
	private Integer paymentDate;

	@Builder
	public Sponsorship(Long id, User user, Long sponsorId, LocalDateTime regTime, Integer point,
		Integer countPayment, Integer paymentDate) {
		this.id = id;
		this.user = user;
		this.sponsorId = sponsorId;
		this.regTime = regTime;
		this.point = point;
		this.countPayment = countPayment;
		this.paymentDate = paymentDate;
	}

	public void updateCountPayment() {
		this.countPayment++;
	}

	public void updatePoint(Integer point) {
		this.point = point;
	}

	public void updatePaymentDate(Integer paymentDate) {
		this.paymentDate = paymentDate;
	}
}
