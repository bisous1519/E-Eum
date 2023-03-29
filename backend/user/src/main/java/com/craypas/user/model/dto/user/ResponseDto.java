package com.craypas.user.model.dto.user;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.user.model.entity.Sponsorship;
import com.craypas.user.model.entity.User;

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
	@NoArgsConstructor
	public static class ReadSponsorship {
		private Long sponsorshipId;
		private Long sponsorId;
		private Long uid;
		private String imagePath;
		private String nickname;
		private Integer point;
		private LocalDate regDate;
		private Long countFromRegDate;
		private Integer buttonStatus;

		public ReadSponsorship(Sponsorship sponsorship) {
			this.sponsorshipId = sponsorship.getId();
			this.sponsorId = sponsorship.getSponsorId();
			this.uid = sponsorship.getUser().getId();
			this.imagePath = sponsorship.getUser().getImagePath();
			this.nickname = sponsorship.getUser().getNickname();
			this.point = sponsorship.getPoint();
			this.regDate = sponsorship.getRegTime().toLocalDate();
			this.countFromRegDate = Duration.between(sponsorship.getRegTime().toLocalDate(), LocalDate.now()).toDays();
			// this.buttonStatus = buttonStatus;
		}
	}
}
