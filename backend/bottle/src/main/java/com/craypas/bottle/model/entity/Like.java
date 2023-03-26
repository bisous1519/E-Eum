package com.craypas.bottle.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.craypas.bottle.model.dto.response.CreatedLikeDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "res_bottle_like")
public class Like {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "user_id")
	private long userId;

	@Column(name = "res_bottle_id")
	private long resBottleId;

	public CreatedLikeDto toCreatedDto() {
		return CreatedLikeDto.builder().id(id).userId(userId).resBottleId(resBottleId).build();
	}
}
