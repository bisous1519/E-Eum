package com.craypas.user.model.dto.user;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.user.model.entity.User;

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
		private MultipartFile profileImage;
		private String introduction;
		private String groupName;
		private Integer dayCnt;

		public GetDreamFeedUser(User user, MultipartFile profileImage) {
			this.nickname = user.getNickname();
			this.profileImage = profileImage;
			this.introduction = user.getIntroduction();
			this.groupName = user.getGroupName();
			this.dayCnt = (int) Duration.between(user.getRegTime(), LocalDateTime.now()).toDays();
		}
	}
}
