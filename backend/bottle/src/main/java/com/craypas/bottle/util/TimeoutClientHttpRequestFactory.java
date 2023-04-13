package com.craypas.bottle.util;

import java.io.IOException;
import java.net.URI;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

public class TimeoutClientHttpRequestFactory extends HttpComponentsClientHttpRequestFactory {

	public TimeoutClientHttpRequestFactory() {
		super();
		setConnectTimeout(3000); // 연결 시간 초과 시간 설정 (3초)
		setReadTimeout(10000); // 응답 시간 초과 시간 설정 (10초)
	}

	@Override
	public ClientHttpRequest createRequest(URI uri, HttpMethod httpMethod) throws IOException {
		return super.createRequest(uri, httpMethod);
	}

	protected HttpClient createHttpClient(int initialMaxTotalConnections, int initialMaxPerRouteConnections) {
		HttpClientBuilder builder = HttpClientBuilder.create();
		builder.useSystemProperties();
		builder.setMaxConnTotal(initialMaxTotalConnections);
		builder.setMaxConnPerRoute(initialMaxPerRouteConnections);
		return builder.build();
	}

}