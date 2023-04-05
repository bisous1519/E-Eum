package com.craypas.dream.model.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

// 파일 업로드 서비스
public interface FireBaseService {
	String uploadFiles(final MultipartFile file, final String folder, final String nameFile) throws IOException;

	String getFileUrl(final String folder, final String fileName);

	void deleteFile(final String folder, final String fileName);
}

