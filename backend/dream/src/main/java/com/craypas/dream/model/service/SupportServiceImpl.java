package com.craypas.dream.model.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.craypas.dream.exception.CustomException;
import com.craypas.dream.exception.ErrorCode;
import com.craypas.dream.model.dto.RequestDto;
import com.craypas.dream.model.dto.ResponseDto;
import com.craypas.dream.model.entity.Support;
import com.craypas.dream.model.entity.SupportUser;
import com.craypas.dream.model.repository.SupportRepository;
import com.craypas.dream.model.repository.SupportUserRepository;

@Service
public class SupportServiceImpl implements SupportService {
	final private SupportRepository supportRepository;
	final private SupportUserRepository supportUserRepository;

	public SupportServiceImpl(SupportRepository supportRepository,
		SupportUserRepository supportUserRepository) {
		this.supportRepository = supportRepository;
		this.supportUserRepository = supportUserRepository;
	}

	// 꿈 후원요청 작성
	@Override
	public ResponseDto.Read createSupport(final RequestDto.Create requestDto) {
		return new ResponseDto.Read(supportRepository.save(requestDto.toEntity()));
	}

	// 꿈 후원요청 단일 조회
	@Override
	public ResponseDto.Read getSupport(final Long sid) {
		// supportRepository.findById(sid)
		return new ResponseDto.Read(
			supportRepository.findById(sid).orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND)));
	}

	// 꿈 후원요청 전체 조회
	@Override
	public List<ResponseDto.Read> getSupportList(final Pageable pageable) {
		return supportRepository.findAll(pageable)
			.stream()
			.map(ResponseDto.Read::new)
			.collect(Collectors.toList());
	}

	// 꿈 후원요청 수정
	@Override
	@Transactional
	public ResponseDto.Read updateSupport(Long sid, RequestDto.Create requestDto) {
		Support support = supportRepository.findById(sid)
			.orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND));
		support.update(requestDto.getTitle(), requestDto.getContent());
		return new ResponseDto.Read(support);
	}

	// 꿈 후원요청 삭제
	@Override
	public void deleteSupport(Long sid) {
		supportRepository.delete(
			supportRepository.findById(sid).orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND)));
	}

	// 꿈 후원요청 검색
	@Override
	public List<ResponseDto.Read> searchSupport(String keyword, Pageable pageable) {
		return supportRepository.findAllByTitleContaining(keyword, pageable)
			.stream()
			.map(ResponseDto.Read::new)
			.collect(Collectors.toList());
	}

	// 꿈 후원하기
	@Override
	public void createSupportUser(final Long sid, final Long uid, final Integer point) {
		Support support = supportRepository.findById(sid)
			.orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND));
		supportUserRepository.save(SupportUser.builder()
			.support(support)
			.writerId(uid)
			.point(point)
			.regTime(LocalDateTime.now())
			.build());
	}

	// 꿈 후원 취소하기
	@Override
	public void deleteSupportUser(Long sid, Long uid) {
		Support support = supportRepository.findById(sid)
			.orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND));
		SupportUser supportUser = supportUserRepository.findBySupportAndWriterId(support, uid);
		if (supportUser == null) {
			throw new CustomException(ErrorCode.SUPPORT_USER_NOT_FOUND);
		} else {
			supportUserRepository.delete(supportUser);
		}
	}

	// 사진 업로드(?)
}
