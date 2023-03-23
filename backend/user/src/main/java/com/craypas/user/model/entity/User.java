package com.craypas.user.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.craypas.user.model.dto.user.RequestDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "pin")
	private String pin;

	@Column(name = "name")
	private String name;

	@Column(name = "nickname")
	private String nickname;

	@Column(name = "gender")
	private Integer gender;

	@Column(name = "image_path")
	private String imagePath;

	@Column(name = "type")
	private Integer type;

	@Column(name = "certificate_path")
	private String certificatePath;

	@Column(name = "point")
	private Integer point;

	@Column(name = "reg_time")
	private LocalDateTime regTime;

	@Column(name = "status")
	private Integer status;

	@Column(name = "introduction")
	private String introduction;

	@Column(name = "group_name")
	private String groupName;

	@Builder
	public User(Long id, String email, String password, String pin, String name, String nickname, Integer gender,
		String imagePath, Integer type, String certificatePath, Integer point, LocalDateTime regTime,
		Integer status, String introduction, String groupName) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.pin = pin;
		this.name = name;
		this.nickname = nickname;
		this.gender = gender;
		this.imagePath = imagePath;
		this.type = type;
		this.certificatePath = certificatePath;
		this.point = point;
		this.regTime = regTime;
		this.status = status;
		this.introduction = introduction;
		this.groupName = groupName;
	}

	public void updateUser(String password, String introduction, String groupName){
		this.password = password;
		this.introduction = introduction;
		this.groupName = groupName;
	}

	public void updatePassword(String password){
		this.password = password;
	}
}
