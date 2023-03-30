package com.craypas.user.model.dto.user;

import java.time.Duration;
import java.time.LocalDateTime;

import com.craypas.user.model.entity.Sponsorship;
import com.craypas.user.model.entity.User;

import lombok.Builder;
import lombok.Getter;

public class ResponseDto {
	@Getter
	public static class GetUser {
		private String name;
		private String introduction;
		private String groupName;

		public GetUser(User user) {
			this.name = user.getName();
			this.introduction = user.getIntroduction();
			this.groupName = user.getGroupName();
		}
	}

	@Getter
	public static class GetDreamFeedUser {
		private String nickname;
		private String imagePath;
		private String introduction;
		private String groupName;
		private Integer dayCnt;

		public GetDreamFeedUser(User user) {
			this.nickname = user.getNickname();
			this.imagePath = user.getImagePath();
			this.introduction = user.getIntroduction();
			this.groupName = user.getGroupName();
			this.dayCnt = (int)Duration.between(user.getRegTime(), LocalDateTime.now()).toDays();
		}
	}

	@Getter
	public static class GetDreamSupportUser {
		private Long uid;
		private String nickname;
		private String introduction;
		private String imagePath;

		public GetDreamSupportUser(User user) {
			this.uid = user.getId();
			this.nickname = user.getNickname();
			this.introduction = user.getIntroduction();
			this.imagePath = user.getImagePath();
		}
	}

	@Getter
	public static class UserPreview {
		private Long uid;
		private String nickname;
		private String imagePath;

		public UserPreview(User user) {
			this.uid = user.getId();
			this.nickname = user.getNickname();
			this.imagePath = user.getImagePath();
		}
	}

	@Getter
	public static class GetProfileInfo {
		private Long uid;
		private String imagePath;
		private String nickname;
		private Boolean isConnected;
		private Long sponsorId;
		private Long sponsorshipId;
		private Integer sponsorshipPoint;
		private Integer sponsorshipPaymentDate;
		private Long countFromRegDate;
		private Integer myPoint;

		@Builder
		public GetProfileInfo(User user, Boolean isConnected, Integer myPoint) {
			this.uid = user.getId();
			this.imagePath = user.getImagePath();
			this.nickname = user.getNickname();
			this.isConnected = isConnected;
			this.myPoint = myPoint;
		}

		public void updateSponsorshipInfo(Sponsorship sponsorship) {
			this.sponsorId = sponsorship.getSponsorId();
			this.sponsorshipId = sponsorship.getSponsorId();
			this.sponsorshipPoint = sponsorship.getPoint();
			this.sponsorshipPaymentDate = sponsorship.getPaymentDate();
			this.countFromRegDate = Duration.between(sponsorship.getRegTime(), LocalDateTime.now()).toDays() + 1;
		}
	}
}
