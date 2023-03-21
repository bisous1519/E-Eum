package com.craypas.user.model.service;

import org.springframework.stereotype.Service;

import com.craypas.user.model.dto.RequestDto;
import com.craypas.user.model.dto.ResponseDto;

@Service
public class UserServiceImpl implements UserService {
	// 회원정보 등록
	@Override
	public ResponseDto.GetUser createUser(RequestDto.CreateUser requestDto) {
		return null;
	}

	// 회원정보 조회
	@Override
	public ResponseDto.GetUser getUser(Long uid) {
		return null;
	}

	// 회원정보 수정
	@Override
	public ResponseDto.GetUser updateUser(final RequestDto.UpdateUser requestDto) {
		return null;
	}

	// 회원 탈퇴
	@Override
	public void removeUser(Long uid) {

	}

	// 회원정보 삭제
	@Override
	public void deleteUser(Long uid) {

	}

	// 포인트 구매
	@Override
	public Integer buyPoint(Long uid, Integer point) {
		return null;
	}

	// 포인트 사용
	@Override
	public Integer usePoint(Long uid, Integer point) {
		return null;
	}

	// 포인트 환불
	@Override
	public Integer refundPoint(Long uid, Integer point) {
		return null;
	}

	// 포인트 현금화 요청
	@Override
	public Integer encashPoint(Long uid, Integer point) {
		return null;
	}

	// 포인트 초기화
	@Override
	public Integer initPoint(Long uid, Integer point) {
		return null;
	}

	// 비밀번호 찾기
	@Override
	public void findPassword() {

	}

	// 비밀번호 변경
	@Override
	public void updatePassword() {

	}

	// 이메일 중복 확인
	@Override
	public Boolean checkEmail() {
		return null;
	}

	// 이메일 인증 코드 발송
	@Override
	public void certifyEmail() {

	}

	// 프로필 사진 업로드
	// 증명 파일 업로드
	// 뱃지 상세 조회
}
