package com.craypas.dream.model.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.craypas.dream.exception.CustomException;
import com.craypas.dream.exception.ErrorCode;
import com.craypas.dream.model.dto.FireBaseService;
import com.craypas.dream.model.dto.support.RequestDto;
import com.craypas.dream.model.dto.support.ResponseDto;
import com.craypas.dream.model.entity.Support;
import com.craypas.dream.model.entity.SupportUser;
import com.craypas.dream.model.entity.Tag;
import com.craypas.dream.model.repository.SupportRepository;
import com.craypas.dream.model.repository.SupportUserRepository;
import com.craypas.dream.model.repository.TagRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class SupportServiceImpl implements SupportService {
	private final SupportRepository supportRepository;
	private final SupportUserRepository supportUserRepository;
	private final TagRepository tagRepository;
	private final FireBaseService fireBaseService;

	@Value("${request.user.url}")
	private String PROJECT_USER_SUPPORT_URL;

	// 꿈 후원요청 작성
	@Override
	public ResponseDto.Read createSupport(final RequestDto.Create requestDto) {
		String imagePath = null;
		// 이미지가 존재하면 FireBase에 저장 후 경로 반환
		if (requestDto.getImage() != null) {
			String saveFileName = String.valueOf(System.nanoTime());
			String bucketFolder = "profile-img";
			try {
				fireBaseService.uploadFiles(requestDto.getImage(), bucketFolder, saveFileName);    // firebase에 파일 저장
			} catch (IOException e) {
				e.printStackTrace();
			}
			imagePath = fireBaseService.getFileUrl(bucketFolder, saveFileName); // 파일 경로 저장
		}

		// Tag 객체 찾기
		Tag tag = tagRepository.findById(requestDto.getTid())
			.orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND));

		// 후원 글 정보 저장
		Support support = supportRepository.save(requestDto.toEntity(tag, imagePath));
		ResponseDto.Read responseDto = new ResponseDto.Read(support);

		// 후원글 작성자 정보 호출
		RestTemplate restTemplate = new RestTemplate();
		String url = PROJECT_USER_SUPPORT_URL + "/" + support.getUserId().toString();
		ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);
		ObjectMapper mapper = new ObjectMapper();
		try {
			Map<String, Object> map = mapper.readValue(result.getBody(), Map.class);
			responseDto.setUserNickname((String)map.get("nickname"));
			responseDto.setUserIntroduction((String)map.get("introduction"));
			responseDto.setUserImagePath((String)map.get("imagePath"));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return responseDto;
	}

	// 꿈 후원요청 단일 조회
	@Override
	public ResponseDto.Read getSupport(final Long sid) {
		// Support 객체 불러오기
		Support support = supportRepository.findById(sid)
			.orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND));
		ResponseDto.Read responseDto = new ResponseDto.Read(support);

		// 후원글 작성자 정보 호출
		RestTemplate restTemplate = new RestTemplate();
		ObjectMapper mapper = new ObjectMapper();
		String url = PROJECT_USER_SUPPORT_URL + "/" + support.getUserId().toString();
		// Request
		ResponseEntity<String> result1 = restTemplate.getForEntity(url, String.class);
		try {
			Map<String, Object> map = mapper.readValue(result1.getBody(), Map.class);
			responseDto.setUserNickname((String)map.get("nickname"));
			responseDto.setUserIntroduction((String)map.get("introduction"));
			responseDto.setUserImagePath((String)map.get("imagePath"));
		} catch (IOException e) {
			e.printStackTrace();
		}

		// 후원자 정보 호출

		// Header set
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		// Body set
		List<SupportUser> supportUserList = supportUserRepository.findAllBySupport(support);
		List<Long> sponsorIdList = new ArrayList<>();
		for (SupportUser supportUser : supportUserList) {
			sponsorIdList.add(supportUser.getWriterId());
		}
		responseDto.setSponsorIdList(sponsorIdList);
		// Message
		HttpEntity<?> requestMessage = new HttpEntity<>(sponsorIdList, httpHeaders);
		// Request
		ResponseEntity<String> result2 = restTemplate.postForEntity(PROJECT_USER_SUPPORT_URL, requestMessage,
			String.class);
		try {
			List<String> list = mapper.readValue(result2.getBody(), List.class);
			responseDto.setSponsorImagePathList(list);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return responseDto;
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
