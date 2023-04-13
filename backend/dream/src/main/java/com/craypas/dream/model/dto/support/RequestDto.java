package com.craypas.dream.model.dto.support;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.dream.model.entity.Support;
import com.craypas.dream.model.entity.Tag;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class RequestDto {
	@Getter
	@NoArgsConstructor
	@ToString
	public static class Create {
		@NotNull
		private Long userId;
		@NotEmpty
		private String title;
		@NotNull
		private Long tid;
		@NotEmpty
		private String content;
		@NotEmpty
		private String purchaseLink;
		@NotEmpty
		private String purchaseLinkDetail;
		@NotNull
		private Integer targetAmount;
		@NotNull
		private LocalDate deadline;
		@NotEmpty
		private String roadAddress;
		@NotEmpty
		private String detailAddress;
		private MultipartFile image;


		public Support toEntity(Tag tag, String imagePath) {
			return Support.builder()
				.title(this.title)
				.content(this.content)
				.userId(this.userId)
				.regTime(LocalDateTime.now())
				.status(0)
				.purchaseLink(purchaseLink)
				.purchaseLinkDetail(purchaseLinkDetail)
				.targetAmount(targetAmount)
				.currentAmount(Integer.valueOf(0))
				.deadline(deadline.atTime(LocalTime.MAX))
				.roadAddress(roadAddress)
				.detailAddress(detailAddress)
				.tag(tag)
				.imagePath(imagePath)
				.build();
		}
	}

	@Getter
	@Setter
	@ToString
	public static class UserPreview {
		private Long uid;
		private String nickname;
		private String imagePath;
	}
}
