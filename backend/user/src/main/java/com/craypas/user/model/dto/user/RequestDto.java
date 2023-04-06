package com.craypas.user.model.dto.user;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.craypas.user.model.entity.Sponsorship;
import com.craypas.user.model.entity.User;

import lombok.Builder;
import lombok.Getter;

public class RequestDto {
	@Getter
	public static class CreateUser {
		@NotEmpty
		private String name; //이름
		@NotEmpty
		private String email; // 이메일
		@NotEmpty
		private String password; // 비밀번호
		@NotEmpty
		private String nickname; // 닉네임
		@NotNull
		private Integer gender; // 성별(여성 / 남성 / 선택안함)
		@NotNull
		private Integer type; // 회원구분(자립준비청년 / 기타사용자)
		private MultipartFile image; // 프로필 사진
		private MultipartFile certificateFile; // 증빙 자료
		private String region;

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
				.region(region)
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
		@NotNull
		private Long sponsorId;
		@NotNull
		private Long uid;
		@NotNull
		private Integer point;
		@NotNull
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
		@NotEmpty
		private String email;
		@NotEmpty
		private String password;
	}
}
