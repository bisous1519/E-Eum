package com.craypas.bottle.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedResBottleDto;
import com.craypas.bottle.model.dto.response.ReceivedUserReqBottleDto;
import com.craypas.bottle.model.dto.response.DetailReqBottleDto;
import com.craypas.bottle.model.dto.response.SummaryBottleDto;
import com.craypas.bottle.model.entity.ReqBottle;
import com.craypas.bottle.model.entity.UserReqBottle;
import com.craypas.bottle.model.repository.QBottleRepository;
import com.craypas.bottle.model.repository.ReqBottleRepository;
import com.craypas.bottle.model.repository.UserReqBottleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BottleService {

	private final ReqBottleRepository reqBottleRepository;
	private final QBottleRepository qBottleRepository;
	private final UserReqBottleRepository userReqBottleRepository;

	public CreatedReqBottleDto sendReqBottles(CreateReqBottleDto reqBottleDto) {
		if (reqBottleDto.getWriterId() == null || reqBottleDto.getContent() == null || reqBottleDto.getType() == null || reqBottleDto.getSentiment() == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}

		ReqBottle reqBottle = reqBottleDto.toEntity();

		// 내가 아닌 모든 유저나 자문단 유저 중에, 랜덤 3명 뽑기! 3명보다 적다면 그냥 다 데려와. -> 이거 유저서비스에서 해야함
		List<UserReqBottle> userReqBottles = new ArrayList<>();
		for (Long receiverId : new long[] {7, 8, 9}) {
			userReqBottles.add(UserReqBottle.builder().receiverId(receiverId).reqBottle(reqBottle).build());
		}
		reqBottle.updateUserReqBottles(userReqBottles);

		return reqBottleRepository.save(reqBottle).toCreatedDto();
	}

	public List<SummaryBottleDto> findAllReqBottleByWriterId(Long writerId) {
		if (writerId == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}
		return reqBottleRepository.findAllByWriterId(writerId).stream()
			.map(ReqBottle::toSummaryBottleDto)
			.collect(Collectors.toList());
	}

	public DetailReqBottleDto findDetailReqBottle(Long id) {
		if (!reqBottleRepository.findById(id).isPresent()) {
			throw new CustomException(ErrorCode.BOTTLE_NOT_FOUND);
		}
		return qBottleRepository.findAllResBottleByReqBottleId(id);
	}

	public List<ReceivedUserReqBottleDto> findAllUserReqBottleByReceiverId(Long receiverId) {
		return userReqBottleRepository.findAllByReceiverId(receiverId).stream()
			.map(UserReqBottle::toCreatedReqDto)
			.collect(Collectors.toList());
	}

	public List<CreatedResBottleDto> findAllResBottleByReqWriterId(Long reqWriterId) {
		return qBottleRepository.findAllResBottleByReqWriterId(reqWriterId);
	}

	// public CreatedResBottleDto sendResBottles(CreateResBottleDto resBottleDto) {
	// 	if (resBottleDto.getContent() == null) {
	// 		throw new CustomException(ErrorCode.INVALID_INPUT);
	// 	}
	// 	return resBottleRepository.save(resBottleDto.toEntity()).toCreatedDto();
	// }
}
