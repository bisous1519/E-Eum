package com.craypas.bottle.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedResBottleDto;
import com.craypas.bottle.model.dto.response.ReceivedUserReqBottleDto;
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

	@PostMapping("/req")
	ResponseEntity<?> sendReqBottle(@Valid @RequestBody CreateReqBottleDto reqBottleDto) {
		String bucketFolder = "", saveFileName = "";
		try {
			String content = reqBottleDto.getContent();
			
			// 유해 탐지 ai 서버 요청
			// 유해 탐지 분산 서버 요청
			
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

			// 해류병 생성
			CreatedReqBottleDto createdBottleDto = bottleService.sendReqBottles(reqBottleDto);
			return new ResponseEntity<>(createdBottleDto, HttpStatus.OK);
		} catch (CustomException e) {
			fireBaseService.deleteFile(bucketFolder, saveFileName);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			e.printStackTrace();
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
			e.printStackTrace();
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
			e.printStackTrace();
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}

	@GetMapping("/receiver/{uid}/list")
	ResponseEntity<?> getReceivedBottles(@PathVariable("uid") Long receiverId) {
		try {
			List<ReceivedUserReqBottleDto> userReqBottleDtos = bottleService.findAllUserReqBottleByReceiverId(receiverId);
			List<CreatedResBottleDto> resBottleDtos = bottleService.findAllResBottleByReqWriterId(receiverId);
			Map<String, List> receivedBottles = new HashMap<>();
			receivedBottles.put("reqBottles", userReqBottleDtos);
			receivedBottles.put("resBottles", resBottleDtos);
			return new ResponseEntity<>(receivedBottles, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
		}
	}
}
