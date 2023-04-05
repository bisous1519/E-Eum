package com.craypas.bottle.model.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateLikeDto;
import com.craypas.bottle.model.dto.request.CreateReportDto;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.request.CreateResBottleDto;
import com.craypas.bottle.model.dto.response.CheckedResBottleDto;
import com.craypas.bottle.model.dto.response.CreatedLikeDto;
import com.craypas.bottle.model.dto.response.CreatedReportDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedResBottleDto;
import com.craypas.bottle.model.dto.response.DetailReqBottleDto;
import com.craypas.bottle.model.dto.response.ReceivedTypeReqBottleDto;
import com.craypas.bottle.model.dto.response.SummaryBottleDto;
import com.craypas.bottle.model.entity.Like;
import com.craypas.bottle.model.entity.ReqBottle;
import com.craypas.bottle.model.entity.UserReqBottle;
import com.craypas.bottle.model.repository.LikeRepository;
import com.craypas.bottle.model.repository.QBottleRepository;
import com.craypas.bottle.model.repository.ReportRepository;
import com.craypas.bottle.model.repository.ReqBottleRepository;
import com.craypas.bottle.model.repository.ResBottleRepository;
import com.craypas.bottle.model.repository.UserReqBottleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BottleService {

	private final ReqBottleRepository reqBottleRepository;
	private final ResBottleRepository resBottleRepository;
	private final QBottleRepository qBottleRepository;
	private final UserReqBottleRepository userReqBottleRepository;
	private final LikeRepository likeRepository;
	private final ReportRepository reportRepository;

	@Transactional
	public CreatedReqBottleDto sendReqBottles(CreateReqBottleDto reqBottleDto, List<Integer> userId) {
		if (reqBottleDto.getWriterId() == null || reqBottleDto.getContent() == null || reqBottleDto.getType() == null || reqBottleDto.getSentiment() == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}

		ReqBottle reqBottle = reqBottleDto.toEntity();

		List<UserReqBottle> userReqBottles = new ArrayList<>();
		for (long receiverId : userId) {
			userReqBottles.add(UserReqBottle.builder().receiverId(receiverId).reqBottle(reqBottle).build());
		}
		reqBottle.updateUserReqBottles(userReqBottles);
		return reqBottleRepository.save(reqBottle).toCreatedDto();
	}

	public List<SummaryBottleDto> findAllReqBottleByWriterId(Long writerId) {
		if (writerId == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}
		return qBottleRepository.findAllReqBottleWithResCntByWriterId(writerId);
	}

	@Transactional
	public DetailReqBottleDto findDetailReqBottle(Long id) throws ParseException {
		if (!reqBottleRepository.findById(id).isPresent()) {
			throw new CustomException(ErrorCode.BOTTLE_NOT_FOUND);
		}
		DetailReqBottleDto resultReqBottleDto = qBottleRepository.findAllResBottleByReqBottleId(id);

		CreatedReqBottleDto reqBottleDto = reqBottleRepository.findById(id).get().toCreatedDto();
		reqBottleDto.setResRead(true);
		reqBottleRepository.save(reqBottleDto.toEntity());

		Optional<Like> queryResult;

		DetailReqBottleDto detailReqBottleDto = qBottleRepository.findAllResBottleByReqBottleId(id);
		for(CheckedResBottleDto resBottleDto : detailReqBottleDto.getResBottles()) {
			queryResult = likeRepository.findByUserIdAndResBottleId(detailReqBottleDto.getWriterId(), resBottleDto.getId());
			if(queryResult.isPresent()) {
				resBottleDto.setLikeDto(queryResult.get().toCreatedDto());
			}
		}
		return resultReqBottleDto;
	}

	public List<ReceivedTypeReqBottleDto> findAllUserReqBottleByReceiverIdAndType(Long receiverId, Integer reqBottletype) {
		List<ReceivedTypeReqBottleDto> receivedReqBottleDtos = qBottleRepository.findAllResBottleByReqWriterIdAndType(receiverId, reqBottletype);

		UserReqBottle userReqBottle;
		for(ReceivedTypeReqBottleDto innerDto : receivedReqBottleDtos) {
			userReqBottle = userReqBottleRepository.findByReceiverIdAndReqBottle(
				receiverId,
				reqBottleRepository.findById(innerDto.getId()).get()
				);
			userReqBottle.updateReceiverRead(true);
			userReqBottleRepository.save(userReqBottle);
		}
		return receivedReqBottleDtos;
	}

	@Transactional
	public CreatedResBottleDto sendResBottles(CreateResBottleDto resBottleDto) {
		Optional<UserReqBottle> userReqBottle = userReqBottleRepository.findById(resBottleDto.getUserReqBottleId());
		if (!userReqBottle.isPresent()) {
			throw new CustomException(ErrorCode.REQ_BOTTLE_NOT_FOUND);
		}
		if (resBottleDto.getContent() == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}
		ReqBottle reqBottle = userReqBottle.get().getReqBottle();
		reqBottle.updateResRead(false);
		reqBottleRepository.save(reqBottle);
		return resBottleRepository.save(resBottleDto.toEntity()).toCreatedDto();
	}
	
	@Transactional
	public CreatedLikeDto createLike(CreateLikeDto likeDto) {
		if(!resBottleRepository.findById(likeDto.getResBottleId()).isPresent()) {
			throw new CustomException(ErrorCode.RES_BOTTLE_NOT_FOUND);
		}
		return likeRepository.save(likeDto.toEntity()).toCreatedDto();
	}

	@Transactional
	public CreatedReportDto reportBottle(CreateReportDto reportDto) {
		Integer type = reportDto.getType();
		Long targetId = reportDto.getTargetId();
		if(type == null || targetId == null || reportDto.getContent() == null) {
			throw new CustomException(ErrorCode.INVALID_INPUT);
		}
		if(type == 0 && !reqBottleRepository.findById(targetId).isPresent()) {
			throw new CustomException(ErrorCode.REQ_BOTTLE_NOT_FOUND);
		}
		else if(type == 1 && !resBottleRepository.findById(targetId).isPresent()) {
			throw new CustomException(ErrorCode.RES_BOTTLE_NOT_FOUND);
		}
		return reportRepository.save(reportDto.toEntity()).toCreatedDto();
	}
}