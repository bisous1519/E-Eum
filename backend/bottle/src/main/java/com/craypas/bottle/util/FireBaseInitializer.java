package com.craypas.bottle.util;

import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
// 빈 등록 후 한번 초기화
public class FireBaseInitializer {

	@Value("${firebase.configuration-file}")
	private String firebaseConfigPath;

	@PostConstruct
	public void initialize() {
		try{
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(
					GoogleCredentials.fromStream(
						new ClassPathResource(firebaseConfigPath).getInputStream()
					)
				).build();
			if(FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(options);
				log.info("Firebase application has been initialized");
			}
		} catch (IOException e) {
			log.error(e.getMessage());
		}
	}
}
