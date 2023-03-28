package com.craypas.dream.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "record")
public class Record {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "content")
	private String content;

	@Column(name = "reg_time")
	private LocalDateTime regTime;

	@Column(name = "writer_id")
	private Long writerId;

	@Column(name = "image_path")
	private String imagePath;

	@ManyToOne
	@JoinColumn(name = "tag_id")
	private Tag tag;

	@Builder
	public Record(Long id, String content, LocalDateTime regTime, Long writerId, String imagePath,
		Tag tag) {
		this.id = id;
		this.content = content;
		this.regTime = regTime;
		this.writerId = writerId;
		this.imagePath = imagePath;
		this.tag = tag;
	}

	public void update(String content, Tag tag) {
		this.content = content;
		this.tag = tag;
	}
}
