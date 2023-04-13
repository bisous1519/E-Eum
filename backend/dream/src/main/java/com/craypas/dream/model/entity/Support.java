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

	@Column(name = "purchase_link")
	private String purchaseLink;

	@Column(name = "purchase_link_detail")
	private String purchaseLinkDetail;

	@Column(name = "deadline")
	private LocalDateTime deadline;

	@Column(name = "road_address")
	private	String roadAddress;

	@Column(name = "detail_address")
	private String detailAddress;

	@Column(name = "target_amount")
	private Integer targetAmount;

	@Column(name = "current_amount")
	private Integer currentAmount;

	@Column(name = "image_path")
	private String imagePath;

	@ManyToOne
	@JoinColumn(name = "tag_id")
	private Tag tag;

	@Builder
	public Support(Long id, String title, String content, LocalDateTime regTime, Integer status, Long userId,
		String purchaseLink, String purchaseLinkDetail, LocalDateTime deadline, String roadAddress,
		String detailAddress, Integer targetAmount, Integer currentAmount, String imagePath,
		Tag tag) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.regTime = regTime;
		this.status = status;
		this.userId = userId;
		this.purchaseLink = purchaseLink;
		this.purchaseLinkDetail = purchaseLinkDetail;
		this.deadline = deadline;
		this.roadAddress = roadAddress;
		this.detailAddress = detailAddress;
		this.targetAmount = targetAmount;
		this.currentAmount = currentAmount;
		this.imagePath = imagePath;
		this.tag = tag;
	}

	public void updateTitleAndContent(String title, String content) {
		this.title = title;
		this.content = content;
	}

	public void updateCurrAmount(Integer amount) {
		this.currentAmount += amount;
	}

	public void done(){
		this.status = 1;
	}
}
