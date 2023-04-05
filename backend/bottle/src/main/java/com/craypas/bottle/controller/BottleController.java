package com.craypas.bottle.controller;

import java.net.ConnectException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.multipart.MultipartFile;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateLikeDto;
import com.craypas.bottle.model.dto.request.CreateReportDto;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.request.CreateResBottleDto;
import com.craypas.bottle.model.dto.response.AbuseResultDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedResBottleDto;
import com.craypas.bottle.model.dto.response.ReceivedTypeReqBottleDto;
import com.craypas.bottle.model.service.APIRequestService;
import com.craypas.bottle.model.service.BottleService;
import com.craypas.bottle.model.service.FireBaseService;
import com.craypas.bottle.model.service.GoogleCloudService;
import com.craypas.bottle.util.InMemoryMultipartFile;
import com.google.protobuf.ByteString;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bottle")
public class BottleController {

	private final BottleService bottleService;

	private final FireBaseService fireBaseService;

	private final GoogleCloudService googleCloudService;

	private final APIRequestService apiRequestService;

	@Value("${server.url.user}")
	private String userServerUrl;

	@Value("${server.url.spark}")
	private String sparkServerUrl;

	@Value("${server.url.python}")
	private String pythonServerUrl;

	@PostMapping("/req")
	ResponseEntity<?> sendReqBottle(@Valid @RequestBody CreateReqBottleDto reqBottleDto) {
		String bucketFolder = "", saveFileName = "";
		try {
			String content = reqBottleDto.getContent();

			reqBottleDto.setSentiment(googleCloudService.getSentimant(content));				// 텍스트 기반 감정분석
			ByteString audioContents = googleCloudService.getAudioContent(content);				// content에서 TTS를 통해 오디오 추출

			saveFileName = String.valueOf(System.nanoTime());				// 유일한 파일 이름 생성

			MultipartFile multipartFile = new InMemoryMultipartFile(		// 오디오를 MultipartFile로 변환
				saveFileName,
				saveFileName+".mp3",
				"audio/mp3",
				audioContents.toByteArray()
			);

			bucketFolder = "tts-mp3";
			fireBaseService.uploadFiles(multipartFile, bucketFolder, saveFileName);		// firebase에 파일 저장

			// tts path 저장
			reqBottleDto.setTtsPath(fireBaseService.getFileUrl(bucketFolder, saveFileName));

			// random user id 요청
			List<Integer> body = apiRequestService.requestGetRandomUserIdAPI(userServerUrl, "/random/"+reqBottleDto.getWriterId()+"/"+reqBottleDto.getType()).getBody();

			CreatedReqBottleDto createdBottleDto = bottleService.sendReqBottles(reqBottleDto, body);
			return new ResponseEntity<>(createdBottleDto, HttpStatus.OK);
		} catch (CustomException e) {
			fireBaseService.deleteFile(bucketFolder, saveFileName);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			fireBaseService.deleteFile(bucketFolder, saveFileName);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@GetMapping("/sender/{uid}/list")
	ResponseEntity<?> getAllReqBottleByWriterId(@PathVariable("uid") Long writerId) {
		try {
			return new ResponseEntity<>(bottleService.findAllReqBottleByWriterId(writerId), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@GetMapping("/req/{id}/res-list")
	ResponseEntity<?> getDetailBottle(@PathVariable("id") Long id) {
		try {
			return new ResponseEntity<>(bottleService.findDetailReqBottle(id), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@GetMapping("/receiver/{uid}/normal-list")
	ResponseEntity<?> getReceivedNormalTypeBottles(@PathVariable("uid") Long receiverId) {
		try {
			return new ResponseEntity<>(bottleService.findAllUserReqBottleByReceiverIdAndType(receiverId, 1), HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@GetMapping("/receiver/{uid}/expert-list")
	ResponseEntity<?> getReceivedExpertTypeBottles(@PathVariable("uid") Long receiverId) {
		try {
			return new ResponseEntity<>(bottleService.findAllUserReqBottleByReceiverIdAndType(receiverId, 2), HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@PostMapping("/{userReqBottleId}/res")
	ResponseEntity<?> sendResBottle(@PathVariable("userReqBottleId") long userReqBottleId, @Valid @RequestBody CreateResBottleDto resBottleDto) {
		String bucketFolder = "", saveFileName = "";
		try {
			String content = resBottleDto.getContent();

			// 유해 탐지 분산 서버 요청
			try {
				AbuseResultDto isAbuse = apiRequestService.requestPostAbuseAnalysisAPI(sparkServerUrl, "content", resBottleDto.getContent()).getBody();
				if(isAbuse.getPrediction()) {
					return new ResponseEntity<>(ErrorCode.ABUSE_CONTENT.getMessage(), ErrorCode.ABUSE_CONTENT.getHttpStatus());
				} else {
					// 유해 탐지 딥러닝 서버 요청
					isAbuse = apiRequestService.requestPostAbuseAnalysisAPI(pythonServerUrl, "input_data", resBottleDto.getContent()).getBody();
					if(isAbuse.getPrediction()) {
						return new ResponseEntity<>(ErrorCode.ABUSE_CONTENT.getMessage(), ErrorCode.ABUSE_CONTENT.getHttpStatus());
					}
				}
			} catch (ResourceAccessException rae) {
				log.error("error: ", rae);
			}

			ByteString audioContents = googleCloudService.getAudioContent(content);				// content에서 TTS를 통해 오디오 추출

			saveFileName = String.valueOf(System.nanoTime());				// 유일한 파일 이름 생성

			MultipartFile multipartFile = new InMemoryMultipartFile(		// 오디오를 MultipartFile로 변환
				saveFileName,
				saveFileName+".mp3",
				"audio/mp3",
				audioContents.toByteArray()
			);

			bucketFolder = "tts-mp3";
			fireBaseService.uploadFiles(multipartFile, bucketFolder, saveFileName);		// firebase에 파일 저장

			// userReqBottleId & tts path 저장
			resBottleDto.setUserReqBottleId(userReqBottleId);
			resBottleDto.setTtsPath(fireBaseService.getFileUrl(bucketFolder, saveFileName));

			// 해류병 생성
			CreatedResBottleDto createdBottleDto = bottleService.sendResBottles(resBottleDto);
			return new ResponseEntity<>(createdBottleDto, HttpStatus.OK);
		} catch (CustomException e) {
			fireBaseService.deleteFile(bucketFolder, saveFileName);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			fireBaseService.deleteFile(bucketFolder, saveFileName);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@PostMapping("/res/{id}/like")
	public ResponseEntity<?> createLike(@PathVariable("id") Long resId, @Valid @RequestBody CreateLikeDto likeDto) {
		try {
			likeDto.setResBottleId(resId);
			return new ResponseEntity<>(bottleService.createLike(likeDto), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@PostMapping("/report")
	public ResponseEntity<?> reportBottle(@Valid @RequestBody CreateReportDto reportDto) {
		try {
			reportDto.setStatus(0);
			return new ResponseEntity<>(bottleService.reportBottle(reportDto), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@GetMapping("/receiver/{uid}/normal-new")
	ResponseEntity<?> getReceivedNormalTypeBottleUnread(@PathVariable("uid") Long receiverId) {
		try {
			boolean unread = false;
			List<ReceivedTypeReqBottleDto> reqBottleDtos = bottleService.findAllUserReqBottleByReceiverIdAndType(receiverId, 1);
			for(ReceivedTypeReqBottleDto reqBottleDto : reqBottleDtos) {
				if(!reqBottleDto.isReceiverRead()) {
					unread = true;
					break;
				}
			}
			return new ResponseEntity<>(unread, HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@GetMapping("/receiver/{uid}/expert-new")
	ResponseEntity<?> getReceivedExpertTypeBottleUnread(@PathVariable("uid") Long receiverId) {
		try {
			boolean unread = false;
			List<ReceivedTypeReqBottleDto> reqBottleDtos = bottleService.findAllUserReqBottleByReceiverIdAndType(receiverId, 2);
			for(ReceivedTypeReqBottleDto reqBottleDto : reqBottleDtos) {
				if(!reqBottleDto.isReceiverRead()) {
					unread = true;
					break;
				}
			}
			return new ResponseEntity<>(unread, HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}
}
