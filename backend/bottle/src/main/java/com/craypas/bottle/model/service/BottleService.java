package com.craypas.bottle.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.SummaryBottleDto;
import com.craypas.bottle.model.entity.ReqBottle;
import com.craypas.bottle.model.repository.ReqBottleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BottleService {

	private final ReqBottleRepository reqBottleRepository;

	public CreatedReqBottleDto sendReqBottles(CreateReqBottleDto reqBottleDto) throws Exception {
		if (reqBottleDto.getWriterId() == null || reqBottleDto.getContent() == null || reqBottleDto.getType() == null || reqBottleDto.getSentiment() == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}
		// 내가 아닌 모든 유저나 자문단 유저 중에, 랜덤 3명 뽑기! 3명보다 적다면 그냥 다 데려와. -> 이거 유저서비스에서 해야함
		
		return reqBottleRepository.save(reqBottleDto.toEntity()).toCreatedDto();
	}

	public List<SummaryBottleDto> findAllByWriterId(Long writerId) {
		if (writerId == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}
		List<SummaryBottleDto> summaryBottleDto = new ArrayList<>();
		for(ReqBottle bottle : reqBottleRepository.findAllByWriterId(writerId)) {
			summaryBottleDto.add(bottle.toSummaryBottleDto());
		}
		return summaryBottleDto;
	}
}
