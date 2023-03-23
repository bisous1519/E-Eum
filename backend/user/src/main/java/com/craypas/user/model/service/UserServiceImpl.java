package com.craypas.user.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.dto.user.ResponseDto;
import com.craypas.user.model.entity.User;
import com.craypas.user.model.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	final private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	// 회원정보 등록
	@Override
	public ResponseDto.GetUser createUser(RequestDto.CreateUser requestDto) {
		return new ResponseDto.GetUser(userRepository.save(requestDto.toEntity()));
	}

	// 이메일 중복 확인(중복 시 예외 호출)
	@Override
	public void isEmailUnique(final String email){
		if(!userRepository.findAllByEmail(email).isEmpty()){
			throw new NullPointerException();
		}
	}

	// 이름 이메일 일치 조회
	@Override
	public Boolean checkNameAndEmail(final String name, final String email) {
		return userRepository.findAllByNameAndEmail(name, email).isEmpty() ? false : true;
	}

	// 꿈피드 회원정보 조회
	@Override
	public ResponseDto.GetDreamFeedUser getDreamFeedUser(final Long uid) {
		// 파이어베이스에서 프로필이미지 불러오기
		MultipartFile profileImage = null;
		return new ResponseDto.GetDreamFeedUser(userRepository.findById(uid).orElseThrow(NullPointerException::new),
			profileImage);
	}

	// 회원 정보 수정
	@Override
	@Transactional
	public ResponseDto.GetUser updateUser(final Long uid, final RequestDto.UpdateUser requestDto) {
		User user = userRepository.findById(uid).orElseThrow(NullPointerException::new);
		user.updateUser(requestDto.getPassword(), requestDto.getIntroduction(), requestDto.getGroupName());
		return new ResponseDto.GetUser(user);
	}

	// 비밀번호 재설정
	@Override
	@Transactional
	public ResponseDto.GetUser updatePassword(final Long uid, final String password){
		User user = userRepository.findById(uid).orElseThrow(NullPointerException::new);
		user.updatePassword(password);
		return new ResponseDto.GetUser(user);
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
