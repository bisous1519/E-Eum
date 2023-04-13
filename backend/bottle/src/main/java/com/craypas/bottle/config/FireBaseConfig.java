package com.craypas.bottle.config;

import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class FireBaseConfig {

	@Value("${firebase.configuration-file}")
	private String firebaseConfigPath;

	@PostConstruct
	public void initialize() {
		try {
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream()))
				.build();
			FirebaseApp.initializeApp(options);
			log.info("Firebase application has been initialized");
		} catch (IOException e) {
			log.error(e.getMessage());
		}
	}
}
