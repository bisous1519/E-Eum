package com.craypas.user.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

}
