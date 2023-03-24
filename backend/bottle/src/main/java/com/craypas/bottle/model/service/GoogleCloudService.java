package com.craypas.bottle.model.service;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.protobuf.ByteString;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class GoogleCloudService {

	// 텍스트 감정분석으로 색 결정
	public int getSentimant(String content) {
		String realContent = content.replaceAll("[!;~^]", "");
		log.info(realContent);

		try (LanguageServiceClient language = LanguageServiceClient.create()) {
			Document doc = Document.newBuilder().setContent(realContent).setType(Document.Type.PLAIN_TEXT).build();
			AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
			Sentiment sentiment = response.getDocumentSentiment();
			if (sentiment == null) {
				log.info("No sentiment found");
			} else {
				float magnitude = sentiment.getMagnitude();
				float score = sentiment.getScore();
				log.info(score + " " + magnitude);
				if (0 <= score && magnitude <= 0.5) 		return 0;	// 중립
				else if (0 <= score && magnitude > 0.5)		return 1;	// 긍정
				else 										return -1;	// 부정
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return 0;
	}

	public ByteString getAudioContent(String content) {
		try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
			SynthesisInput input = SynthesisInput.newBuilder().setText(content).build();

			VoiceSelectionParams voice =
				VoiceSelectionParams.newBuilder()
					.setLanguageCode("ko-KR")
					.setSsmlGender(SsmlVoiceGender.FEMALE)
					.build();

			AudioConfig audioConfig = AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();		// 리턴할 오디오 타입 선택

			SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);	// TTS API 호출
			return response.getAudioContent();																	// 응답으로부터 오디오 추출
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
