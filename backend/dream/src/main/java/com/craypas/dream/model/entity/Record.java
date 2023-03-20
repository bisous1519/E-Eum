package com.craypas.dream.model.entity;

import java.time.LocalDateTime;

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
@NoArgsConstructor
@Entity
@Table(name = "record")
public class Record {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "content")
	private String content;

	@Column(name = "reg_date")
	private LocalDateTime regDate;

	@Column(name = "writer_id")
	private Long writerId;

	@Builder
	public Record(Long id, String content, LocalDateTime regDate, Long writerId) {
		this.id = id;
		this.content = content;
		this.regDate = regDate;
		this.writerId = writerId;
	}

	public void update(String content) {
		this.content = content;
		this.regDate = LocalDateTime.now();
	}

}
