package com.craypas.bottle.model.dto.response;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserBadgeDto {
	private String userNickname;
	private List<BadgeDto> badgeList;
}
