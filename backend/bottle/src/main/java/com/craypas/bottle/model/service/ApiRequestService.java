package com.craypas.bottle.model.service;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.craypas.bottle.model.dto.response.AbuseResultDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApiRequestService {
	public ResponseEntity<List> requestGetAPI(String urlStr, String path) {
		URI uri = UriComponentsBuilder
			.fromUriString(urlStr)
			.path(path)
			.build()
			.toUri();
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForEntity(uri, List.class);
	}

	public ResponseEntity<AbuseResultDto> requestPostAPI(String urlStr, String key, String content) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		String requestBody = "{\""+key+"\":\""+content+"\"}";

		HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.postForEntity(urlStr, request, AbuseResultDto.class);
	}
}
