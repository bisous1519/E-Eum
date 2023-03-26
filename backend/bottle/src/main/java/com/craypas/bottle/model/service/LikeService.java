package com.craypas.bottle.model.service;

import org.springframework.stereotype.Service;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateLikeDto;
import com.craypas.bottle.model.dto.response.CreatedLikeDto;
import com.craypas.bottle.model.repository.LikeRepository;
import com.craypas.bottle.model.repository.ResBottleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeService {
	private final LikeRepository likeRepository;
	private final ResBottleRepository resBottleRepository;

	public CreatedLikeDto create(CreateLikeDto likeDto) {
		if(!resBottleRepository.findById(likeDto.getResBottleId()).isPresent()) {
			throw new CustomException(ErrorCode.RES_BOTTLE_NOT_FOUND);
		}
		return likeRepository.save(likeDto.toEntity()).toCreatedDto();
	}
}
