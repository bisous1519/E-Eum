package com.craypas.user.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table
public class Faq {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "category")
	private String category;

	@Column(name = "region")
	private String region;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "url_name")
	private String urlName;

	@Column(name = "url_link")
	private String urlLink;

	@Builder
	public Faq(Long id, String category, String region, String title, String content, String urlName,
		String urlLink) {
		this.id = id;
		this.category = category;
		this.region = region;
		this.title = title;
		this.content = content;
		this.urlName = urlName;
		this.urlLink = urlLink;
	}
}
