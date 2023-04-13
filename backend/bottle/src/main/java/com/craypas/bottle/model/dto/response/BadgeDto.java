package com.craypas.bottle.model.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BadgeDto {
	private Long id;
	private String name;
	private String description;
	private String imagePath;
}
