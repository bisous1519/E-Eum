package com.craypas.bottle.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedBottleDto;
import com.craypas.bottle.model.service.BottleService;
import com.craypas.bottle.model.service.FireBaseService;
import com.craypas.bottle.util.InMemoryMultipartFile;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.protobuf.ByteString;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/api/bottle")
public class BottleController {

	private final FireBaseService fireBaseService;

	private final BottleService bottleService;

	@PostMapping("/req")
	ResponseEntity<?> sendRequestBottle(@RequestBody CreateReqBottleDto reqBottleDto) throws Exception {
		// 텍스트 감정분석으로 색 결정
		reqBottleDto.setColor(1);
		
		// content의 TTS mp3 파일을 firebase에 저장
		String bucketFolder = "tts-mp3";
		String saveFileName;
		try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
			SynthesisInput input = SynthesisInput.newBuilder().setText(reqBottleDto.getContent()).build();

			VoiceSelectionParams voice =
				VoiceSelectionParams.newBuilder()
					.setLanguageCode("ko-KR")
					.setSsmlGender(SsmlVoiceGender.FEMALE)
					.build();

			AudioConfig audioConfig = AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();		// 리턴할 오디오 타입 선택

			SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);	// TTS API 호출
			ByteString audioContents = response.getAudioContent();												// 응답으로부터 오디오 추출

			saveFileName = String.valueOf(System.nanoTime());				// 유일한 파일 이름 생성

			MultipartFile multipartFile = new InMemoryMultipartFile(		// 오디오를 MultipartFile로 변환
				saveFileName,
				saveFileName+".mp3",
				"audio/mp3",
				audioContents.toByteArray()
			);

			fireBaseService.uploadFiles(multipartFile, bucketFolder, saveFileName);		// firebase에 파일 저장
		}

		// 해류병 생성
		try {
			CreatedBottleDto createdBottleDto = bottleService.create(reqBottleDto);
			createdBottleDto.setTtsPath(fireBaseService.getFileUrl(bucketFolder, saveFileName));
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
}
