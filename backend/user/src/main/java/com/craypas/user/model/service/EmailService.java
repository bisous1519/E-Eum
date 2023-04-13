package com.craypas.user.model.service;

import javax.mail.internet.MimeMessage;

public interface EmailService {
	MimeMessage createMessage(String to, String ePw) throws Exception;

	String createKey();

	String sendSimpleMessage(String to) throws Exception;
}