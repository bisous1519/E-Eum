package com.craypas.bottle.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedBottleDto;
import com.craypas.bottle.model.dto.response.SummaryBottleDto;
import com.craypas.bottle.model.repository.BottleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BottleService {

	private final BottleRepository bottleRepository;

	public CreatedBottleDto create(CreateReqBottleDto reqBottleDto) throws Exception {
		if (reqBottleDto.getWriterId() == null || reqBottleDto.getContent() == null || reqBottleDto.getType() == null || reqBottleDto.getSentiment() == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}
		return bottleRepository.save(reqBottleDto.toEntity()).toCreatedDto();
	}
}
