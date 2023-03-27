package com.craypas.dream.model.dto;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.StorageClient;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
// 파일 업로드 서비스
public class FireBaseService {

	@Value("${firebase.bucket-name}")
	private String bucketName;

	public String uploadFiles(MultipartFile file, String folder, String nameFile) throws IOException {
		Bucket bucket = StorageClient.getInstance().bucket(bucketName);
		InputStream content = new ByteArrayInputStream(file.getBytes());
		Blob blob = bucket.create(folder+"/"+nameFile, content, file.getContentType());
		return blob.getMediaLink();
	}
	public String getFileUrl(String folder, String fileName) {
		return "https://firebasestorage.googleapis.com/v0/b/ardent-bulwark-380505.appspot.com/o/" + folder + "%2F" + fileName + "?alt=media";
	}

	public void deleteFile(String folder, String fileName) {
		Storage storage = StorageOptions.getDefaultInstance().getService();
		BlobId blobId = BlobId.of(bucketName, folder + "/" + fileName);
		log.info(folder + "/" + fileName);
		boolean deleted = storage.delete(blobId);
		if (deleted) {
			log.info("File was deleted.");
		} else {
			log.info("File was not found.");
		}
	}
}

