package com.craypas.bottle.controller;

import java.io.FileOutputStream;
import java.io.OutputStream;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
@RestController
@RequestMapping("/api/bottle")
public class BottleController {

	@PostMapping("/{id}/tts")
	ResponseEntity<?> getTts(@PathVariable("id") long id, @RequestBody String letter) throws Exception {
		// Instantiates a client
		try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
			// Set the text input to be synthesized
			SynthesisInput input = SynthesisInput.newBuilder().setText(letter).build();

			// Build the voice request, select the language code ("en-US") and the ssml voice gender
			VoiceSelectionParams voice =
				VoiceSelectionParams.newBuilder()
					.setLanguageCode("ko-KR")
					.setSsmlGender(SsmlVoiceGender.FEMALE)
					.build();

			// Select the type of audio file you want returned
			AudioConfig audioConfig =
				AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();

			// Perform the text-to-speech request on the text input with the selected voice parameters and
			// audio file type
			SynthesizeSpeechResponse response =
				textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

			// Get the audio contents from the response
			ByteString audioContents = response.getAudioContent();

			// Write the response to the output file.
			try (OutputStream out = new FileOutputStream("output.mp3")) {
				out.write(audioContents.toByteArray());
				System.out.println("Audio content written to file \"output.mp3\"");
				return new ResponseEntity<>("파일 경로", HttpStatus.OK);
			}
		}
	}
}
