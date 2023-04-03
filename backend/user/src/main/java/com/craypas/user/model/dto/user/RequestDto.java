package com.craypas.user.model.dto.user;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.user.model.entity.Sponsorship;
import com.craypas.user.model.entity.User;

import lombok.Builder;
import lombok.Getter;

public class RequestDto {
	@Getter
	public static class CreateUser {
		private String name; //이름
		private String email; // 이메일
		private String password; // 비밀번호
		private String nickname; // 닉네임
		private Integer gender; // 성별(여성 / 남성 / 선택안함)
		private MultipartFile image; // 프로필 사진
		private Integer type; // 회원구분(자립준비청년 / 기타사용자)
		private MultipartFile certificateFile; // 증빙 자료

		@Builder
		public User toEntity() {
			return User.builder()
				.name(this.name)
				.email(this.email)
				.password(this.password)
				.nickname(this.nickname)
				.gender(this.gender)
				.type(type)
				.point(0)
				.regTime(LocalDateTime.now())
				.status(0)
				.build();
		}
	}

	@Getter
	public static class UpdateUser {
		private String password;
		private String introduction;
		private String groupName;

	}

	@Getter
	public static class CreateSponsorship{
		private Long sponsorId;
		private Long uid;
		private Integer point;
		private Integer paymentDate;

		@Builder
		public Sponsorship toEntity(User user){
			return Sponsorship.builder()
				.user(user)
				.sponsorId(this.sponsorId)
				.point(this.point)
				.paymentDate(this.paymentDate)
				.countPayment(0)
				.regTime(LocalDateTime.now())
				.build();
		}
	}

	@Getter
	public static class LoginUser {
		private String email;
		private String password;
	}
}
