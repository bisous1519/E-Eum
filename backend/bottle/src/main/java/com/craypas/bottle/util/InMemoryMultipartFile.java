package com.craypas.bottle.util;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

// A helper class to create a MultipartFile object from a byte array in memory
public class InMemoryMultipartFile implements MultipartFile {

	private final byte[] content;
	private final String name;
	private final String originalFilename;
	private final String contentType;

	public InMemoryMultipartFile(String name, String originalFilename, String contentType, byte[] content) {
		this.name = name;
		this.originalFilename = originalFilename;
		this.contentType = contentType;
		this.content = content;
	}

	@Override
	public String getName() {
		return this.name;
	}

	@Override
	public String getOriginalFilename() {
		return this.originalFilename;
	}

	@Override
	public String getContentType() {
		return this.contentType;
	}

	@Override
	public boolean isEmpty() {
		return this.content == null || this.content.length == 0;
	}

	@Override
	public long getSize() {
		return this.content.length;
	}

	@Override
	public byte[] getBytes() throws IOException {
		return this.content;
	}

	@Override
	public InputStream getInputStream() throws IOException {
		return new ByteArrayInputStream(this.content);
	}

	@Override
	public void transferTo(File file) throws IOException, IllegalStateException {
		new FileOutputStream(file).write(this.content);
	}
}
