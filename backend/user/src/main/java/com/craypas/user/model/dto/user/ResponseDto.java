package com.craypas.user.model.dto.user;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import com.craypas.user.model.entity.Badge;
import com.craypas.user.model.entity.Faq;
import com.craypas.user.model.entity.Sponsorship;
import com.craypas.user.model.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
	public static class GetUserPreview {
		private Long uid;
		private String nickname;
		private String imagePath;

		public GetUserPreview(User user) {
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

	@Getter
	public static class GetBadge {
		private Long id;
		private String name;
		private String description;
		private String imagePath;

		public GetBadge(Badge badge) {
			this.id = badge.getId();
			this.name = badge.getName();
			this.description = badge.getDescription();
			this.imagePath = badge.getImagePath();
		}
	}

	@Getter
	@NoArgsConstructor
	public static class GetUserBadge {
		private Long infoId;
		private GetUserPreview user;
		private GetBadge badge;
		private LocalDateTime regTime;

		@Builder
		public GetUserBadge(Long infoId, GetUserPreview user, GetBadge badge, LocalDateTime regTime) {
			this.infoId = infoId;
			this.user = user;
			this.badge = badge;
			this.regTime = regTime;
		}
	}

	@Getter
	@NoArgsConstructor
	public static class GetUserBadgeInfo {
		private String userNickname;
		List<GetBadge> badgeList;

		@Builder
		public GetUserBadgeInfo(String userNickname, List<GetBadge> badgeList) {
			this.userNickname = userNickname;
			this.badgeList = badgeList;
		}
	}

	@Getter
	@NoArgsConstructor
	public static class GetFaq {
		private String category;
		private String region;
		private String title;
		private String content;
		private String urlName;
		private String urlLink;

		@Builder
		public GetFaq(Faq faq) {
			this.category = faq.getCategory();
			this.region = faq.getRegion();
			this.title = faq.getTitle();
			this.content = faq.getContent();
			this.urlName = faq.getUrlName();
			this.urlLink = faq.getUrlLink();
		}
	}

}
