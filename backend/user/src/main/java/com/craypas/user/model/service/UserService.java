package com.craypas.user.model.service;

import java.util.List;

import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.dto.user.ResponseDto;

public interface UserService {
	// 회원정보 등록
	ResponseDto.GetUser createUser(final RequestDto.CreateUser requestDto);

	// 이메일 중복 확인
	void isEmailUnique(final String email);

	// 이름 이메일 일치 조회
	Boolean checkNameAndEmail(final String name, final String email);

	// 꿈피드 회원정보 조회
	ResponseDto.GetDreamFeedUser getDreamFeedUser(final Long uid);

	// 회원 정보 수정
	ResponseDto.GetUser updateUser(final Long uid, final RequestDto.UpdateUser requestDto);

	// 비밀번호 재설정
	ResponseDto.GetUser updatePassword(final Long uid, final String password);

	// 회원 탈퇴
	void removeUser(final Long uid);

	// 회원정보 삭제
	void deleteUser(final Long uid);

	// 포인트 구매
	Integer buyPoint(final Long uid, final Integer point);

	// 포인트 사용
	Integer usePoint(final Long uid, final Integer point);

	// 포인트 환불
	Integer refundPoint(final Long uid, final Integer point);

	// 포인트 현금화 요청
	Integer encashPoint(final Long uid, final Integer point);

	// 포인트 초기화
	Integer initPoint(final Long uid, final Integer point);

	// 회원 정보 단일 조회(꿈 후원글)
	ResponseDto.GetDreamSupportUser getDreamSupportUser(final Long uid);

	// 여러 회원 프로필 사진 조회(후원자)
	List<String> getDreamSupportSponsor(final String uidList);

	// 회원 프리뷰 목록 조회
	List<ResponseDto.UserPreview> getUserPreviewList(final String uidList);

	// 비밀번호 찾기
	void findPassword();

	// 비밀번호 변경
	void updatePassword();

	// 이메일 중복 확인
	Boolean checkEmail();

	// 이메일 인증 코드 발송
	void certifyEmail();

	// 프로필 사진 업로드?
	// 증명 파일 업로드?
	// 뱃지 상세 조회?
}
