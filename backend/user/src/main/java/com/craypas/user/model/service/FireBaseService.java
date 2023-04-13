package com.craypas.user.model.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;


// 파일 업로드 서비스
public interface FireBaseService {
	String uploadFiles(MultipartFile file, String folder, String nameFile) throws IOException;

	String getFileUrl(String folder, String fileName);

	void deleteFile(String folder, String fileName);
}