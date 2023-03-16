package com.craypas.dream.model.service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.craypas.dream.model.dto.RequestDto;
import com.craypas.dream.model.dto.ResponseDto;
import com.craypas.dream.model.entity.Support;
import com.craypas.dream.model.repository.SupportRepository;

@Service
public class SupportServiceImpl implements SupportService {
	final private SupportRepository supportRepository;

	public SupportServiceImpl(SupportRepository supportRepository) {
		this.supportRepository = supportRepository;
	}

	// 꿈 후원요청 작성
	@Override
	public ResponseDto.Read createSupport(final RequestDto.Create requestDto) {
		return new ResponseDto.Read(supportRepository.save(requestDto.toEntity()));
	}

	// 꿈 후원요청 단일 조회
	@Override
	public ResponseDto.Read getSupport(final Long sid) {
		return new ResponseDto.Read(supportRepository.findById(sid).orElseThrow(NullPointerException::new));
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
		Support support = supportRepository.findById(sid).orElseThrow(NullPointerException::new);
		support.update(requestDto.getTitle(), requestDto.getContent());
		return new ResponseDto.Read(support);
	}

	// 꿈 후원요청 삭제
	@Override
	public void deleteRecord(Long sid) {
		supportRepository.deleteById(sid);
	}

	// 꿈 후원요청 검색
	@Override
	public List<ResponseDto.Read> searchSupport(String keyword, Pageable pageable) {
		return ;
	}

	// 꿈 후원하기
	// 꿈 후원 취소하기
	// 사진 업로드(?)
}
