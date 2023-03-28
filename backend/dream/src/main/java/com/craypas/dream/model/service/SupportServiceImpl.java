package com.craypas.dream.model.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
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
	public List<ResponseDto.Preview> getSupportList(final Integer sortType) {
		// 최신순 / 마감임박순 / 달성높은순 / 달성낮은순으로 정렬하여 support list를 가져온다
		List<Support> supportList = supportRepository.findAllByStatus(0);
		switch (sortType){
			// 1. 최신순
			case 1:
				Collections.sort(supportList, ((o1, o2) -> o1.getRegTime().isBefore(o2.getRegTime()) ? 1 : -1));
				break;
			// 2. 마감 임박 순
			case 2:
				Collections.sort(supportList, ((o1, o2) -> o1.getDeadline().isAfter(o2.getDeadline()) ? 1 : -1));
				break;
			// 3. 달성률 높은 순
			case 3:
				Collections.sort(supportList, ((o1, o2) ->
					o1.getCurrentAmount() * o2.getTargetAmount() < o2.getCurrentAmount() * o1.getTargetAmount() ? 1 :
						-1));
				break;
			// 4. 달성률 낮은 순
			case 4:
				Collections.sort(supportList, ((o1, o2) ->
					o1.getCurrentAmount() * o2.getTargetAmount() > o2.getCurrentAmount() * o1.getTargetAmount() ? 1 :
						-1));
				break;
			default:
				throw new CustomException(ErrorCode.INVALID_SORT_TYPE);
		}

		// 2. 각 support를 순회하며 적절한 dto를 만들고 리스트에 추가한다
		List<ResponseDto.Preview> previewList = new ArrayList<>(supportList.size());
		for(Support support : supportList) {
			previewList.add(new ResponseDto.Preview(support));
		}

		// 3. uid 리스트를 만들어 회원 정보를 요청해 가져온다.
		// Header set
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		// Body set
		List<Long> uidList = new ArrayList<>(supportList.size());
		for(Support support : supportList) {
			uidList.add(support.getUserId());
		}
		RestTemplate restTemplate = new RestTemplate();
		ObjectMapper mapper = new ObjectMapper();
		String url = PROJECT_USER_SUPPORT_URL + "/preview";
		// Message
		HttpEntity<?> requestMessage = new HttpEntity<>(uidList, httpHeaders);
		// Request
		ResponseEntity<String> result = restTemplate.postForEntity(url, requestMessage,
			String.class);
		try {
			List<LinkedHashMap<String, String>> list = mapper.readValue(result.getBody(), List.class);
			for(int i = 0; i < supportList.size(); i++){
				previewList.get(i).setUserNickname(list.get(i).get("nickname"));
				previewList.get(i).setUserImagePath(list.get(i).get("imagePath"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return previewList;
	}

	// 꿈 후원요청 수정시 필요한 정보 조회
	@Override
	public ResponseDto.Update getSupportForUpdate(final Long sid) {
		return new ResponseDto.Update(
			supportRepository.findById(sid).orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND)));
	}

	// 꿈 후원요청 수정
	@Override
	@Transactional
	public ResponseDto.Read updateSupport(final Long sid, final RequestDto.Create requestDto) {
		Support support = supportRepository.findById(sid)
			.orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND));
		support.updateTitleAndContent(requestDto.getTitle(), requestDto.getContent());
		return new ResponseDto.Read(support);
	}

	// 꿈 후원요청 삭제
	@Override
	public void deleteSupport(final Long sid) {
		supportRepository.delete(
			supportRepository.findById(sid).orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND)));
	}

	// 꿈 후원요청 검색
	@Override
	public List<ResponseDto.Preview> searchSupport(final String keyword) {
		return supportRepository.findAllByTitleContainingOrderByRegTimeDesc(keyword)
			.stream()
			.map(ResponseDto.Preview::new)
			.collect(Collectors.toList());
	}

	// 꿈 후원하기
	@Override
	@Transactional
	public ResponseDto.Read createSupportUser(final Long sid, final Long uid, final Integer point) {
		Support support = supportRepository.findById(sid)
			.orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND));
		supportUserRepository.save(SupportUser.builder()
			.support(support)
			.writerId(uid)
			.point(point)
			.regTime(LocalDateTime.now())
			.build());
		support.updateCurrAmount(point);
		return new ResponseDto.Read(support);
	}

	// 꿈 후원 취소하기
	@Override
	@Transactional
	public ResponseDto.Read deleteSupportUser(Long sid, Long uid) {
		Support support = supportRepository.findById(sid)
			.orElseThrow(() -> new CustomException(ErrorCode.SUPPORT_NOT_FOUND));
		SupportUser supportUser = supportUserRepository.findBySupportAndWriterId(support, uid);
		Integer point = supportUser.getPoint();
		if (supportUser == null) {
			throw new CustomException(ErrorCode.SUPPORT_USER_NOT_FOUND);
		}
		supportUserRepository.delete(supportUser);
		support.updateCurrAmount((-1) * point);
		return new ResponseDto.Read(support);
	}
}
