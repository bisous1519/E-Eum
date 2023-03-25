package com.craypas.bottle.model.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceivedUserResBottleDto {

	private Long user_req_bottle_id;
	private List<CreatedResBottleDto> resBottles = new ArrayList<>();
}
