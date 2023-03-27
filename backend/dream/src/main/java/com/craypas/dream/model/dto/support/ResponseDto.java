package com.craypas.dream.model.dto.support;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.dream.model.entity.Support;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class ResponseDto {
	@Getter
	@Setter
	@ToString
	public static class Read {
		private String imagePath; // 후원글 이미지 경로
		private String title; // 후원글 제목
		private String purchaseLink; // 구매 링크
		private String purchaseLinkDetail; // 구매 링크 설명
		private LocalDate regTime; // 후원 등록일
		private LocalDate deadline; // 후원 마감일
		private Integer targetAmount; // 목표 후원금액
		private Integer currentAmount; // 현재 후원금액
		private Integer achievementRate; // 달성률
		private List<Long> sponsorIdList; // 후원자 uid 목록
		private List<String> sponsorImagePathList; // 후원자 프로필사진 목록
		private Long uid; // 후원글 작성자 id
		private String userNickname; // 후원글 작성자 닉네임
		private String userIntroduction; // 후원글 작성자 소개
		private String userImagePath; // 후원글 작성자 프로필사진
		private Long tid; // 후원글 태그 id
		private String tagName; // 후원글 태그 이름
		private String content; // 후원글 내용

		@Builder
		public Read(Support support) {
			this.imagePath = support.getImagePath();
			this.title = support.getTitle();
			this.purchaseLink = support.getPurchaseLink();
			this.purchaseLinkDetail = support.getPurchaseLinkDetail();
			this.regTime = support.getRegTime().toLocalDate();
			this.deadline = support.getDeadline().toLocalDate();
			this.targetAmount = support.getTargetAmount();
			this.currentAmount = support.getCurrentAmount();
			this.achievementRate = (100*support.getCurrentAmount()) / support.getTargetAmount();
			// this.sponsorIdList = support.getS;
			// this.sponsorImagePathList = sponsorImagePathList;
			this.uid = support.getUserId();
			// this.userNickname = userNickname;
			// this.userIntroduction = userIntroduction;
			// this.userImage = userImage;
			this.tid = support.getTag().getId();
			this.tagName = support.getTag().getName();
			this.content = support.getContent();
		}
	}

	@Getter
	@Setter
	@ToString
	public static class Preview {
		private Long uid;
		private String userNickname;
		private String userImagePath;
		private Long sid;
		private String title;
		private Integer targetAmount;
		private Integer achievementRate;

		@Builder
		public Preview(Support support) {
			this.uid = support.getUserId();
			// this.userNickname = userNickname;
			// this.userImagePath = userImagePath;
			this.sid = support.getId();
			this.title = support.getTitle();
			this.targetAmount = support.getTargetAmount();
			this.achievementRate = (100 * support.getCurrentAmount()) / support.getTargetAmount();
		}
	}
}
