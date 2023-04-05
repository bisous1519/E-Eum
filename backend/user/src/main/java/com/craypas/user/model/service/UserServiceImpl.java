package com.craypas.user.model.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.craypas.user.exception.CustomException;
import com.craypas.user.exception.ErrorCode;
import com.craypas.user.model.dto.user.RequestDto;
import com.craypas.user.model.dto.user.ResponseDto;
import com.craypas.user.model.entity.Badge;
import com.craypas.user.model.entity.Faq;
import com.craypas.user.model.entity.User;
import com.craypas.user.model.entity.UserBadge;
import com.craypas.user.model.repository.BadgeRepository;
import com.craypas.user.model.repository.FaqRepository;
import com.craypas.user.model.repository.UserBadgeRepository;
import com.craypas.user.model.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;
	private final BadgeRepository badgeRepository;
	private final UserBadgeRepository userBadgeRepository;
	private final FaqRepository faqRepository;
	private final FireBaseService fireBaseService;

	// 회원정보 등록
	@Override
	@Transactional
	public ResponseDto.GetUser createUser(RequestDto.CreateUser requestDto) {
		User user = requestDto.toEntity();

		// 1. 프로필 이미지가 존재하면 FireBase에 저장 후 경로 반환
		String imagePath = null;
		if (requestDto.getImage() != null) {
			String saveFileName = String.valueOf(System.nanoTime());
			String bucketFolder = "profile-image";
			try {
				fireBaseService.uploadFiles(requestDto.getImage(), bucketFolder, saveFileName);    // firebase에 파일 저장
			} catch (IOException e) {
				e.printStackTrace();
			}
			imagePath = fireBaseService.getFileUrl(bucketFolder, saveFileName); // 파일 경로 저장
		}

		// 2. 증빙 파일이 존재하면 FireBase에 저장 후 경로 반환
		String certificateFile = null;
		if (requestDto.getCertificateFile() != null) {
			String saveFileName = String.valueOf(System.nanoTime());
			String bucketFolder = "certificate-file";
			try {
				fireBaseService.uploadFiles(requestDto.getImage(), bucketFolder, saveFileName);    // firebase에 파일 저장
			} catch (IOException e) {
				e.printStackTrace();
			}
			certificateFile = fireBaseService.getFileUrl(bucketFolder, saveFileName); // 파일 경로 저장
		}

		// 3. 파일 경로들을 user 객체에 저장
		user.updateImagePath(imagePath);
		user.updateCertificatePath(certificateFile);
		return new ResponseDto.GetUser(userRepository.save(user));
	}

	// 이메일 중복 확인(중복 시 예외 호출)
	@Override
	public void isEmailUnique(final String email) {
		if (email == null) {
			throw new CustomException(ErrorCode.EMAIL_IS_NULL);
		}
		if (userRepository.countByEmail(email) > 0) {
			throw new CustomException(ErrorCode.EMAIL_ALREADY_EXIST);
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
		return new ResponseDto.GetDreamFeedUser(
			userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)));
	}

	// 회원 정보 수정
	@Override
	@Transactional
	public ResponseDto.GetUser updateUser(final Long uid, final RequestDto.UpdateUser requestDto) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		user.updateUser(requestDto.getPassword(), requestDto.getIntroduction(), requestDto.getGroupName());
		return new ResponseDto.GetUser(user);
	}

	// 비밀번호 재설정
	@Override
	@Transactional
	public ResponseDto.GetUser updatePassword(final Long uid, final Map<String, String> requestMap) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		user.updatePassword(requestMap.get("password"));
		return new ResponseDto.GetUser(user);
	}

	// 회원 정보 단일 조회(꿈 후원글)
	@Override
	public ResponseDto.GetDreamSupportUser getDreamSupportUser(final Long uid) {
		return new ResponseDto.GetDreamSupportUser(
			userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)));
	}

	// 여러 회원 프로필 사진 조회(후원자)
	@Override
	public List<String> getDreamSupportSponsor(final String uidList) {
		List<String> imagePathList = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			List<Integer> list = mapper.readValue(uidList, List.class);
			for (Integer uid : list) {
				imagePathList.add(
					userRepository.findById(uid.longValue())
						.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND))
						.getImagePath());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return imagePathList;
	}

	// 회원 프리뷰 목록 조회
	@Override
	public List<ResponseDto.GetUserPreview> getUserPreviewList(final String uidList) {
		List<ResponseDto.GetUserPreview> userPreviewList = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			List<Integer> list = mapper.readValue(uidList, List.class);
			for (Integer uid : list) {
				userPreviewList.add(new ResponseDto.GetUserPreview(userRepository.findById(uid.longValue())
					.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND))));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return userPreviewList;
	}

	// 회원 탈퇴
	@Override
	@Transactional
	public void removeUser(Long uid) {
		userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)).deactivate();
	}

	// 회원정보 삭제
	@Override
	public void deleteUser(Long uid) {
		userRepository.delete(
			userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)));
	}

	// 포인트 구매
	@Override
	@Transactional
	public Integer buyPoint(Long uid, Map<String, Integer> requestMap) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		user.updatePoint(requestMap.get("point"));
		return user.getPoint();
	}

	// 포인트 사용
	@Override
	@Transactional
	public Integer usePoint(Long uid, Map<String, Integer> requestMap) {
		// 사용 전에 포인트가 충분한지 검사
		System.out.println("=============================");
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		Integer point = requestMap.get("point");
		System.out.println(requestMap.toString());
		System.out.println(point);
		if(user.getPoint() < point){
			throw new CustomException(ErrorCode.NOT_ENOUGH_POINT);
		}
		user.updatePoint((-1) * point);
		return user.getPoint();
	}

	// 포인트 환불
	@Override
	@Transactional
	public Integer refundPoint(Long uid, Map<String, Integer> requestMap) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		user.updatePoint(requestMap.get("point"));
		return user.getPoint();
	}

	// 포인트 현금화 요청
	@Override
	public Integer encashPoint(Long uid) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		return user.getPoint();
	}

	// 포인트 초기화
	@Override
	@Transactional
	public Integer initPoint(Long uid) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		user.updatePoint((-1) * user.getPoint());
		return user.getPoint();
	}

	// 프로필 사진 업로드
	@Override
	@Transactional
	public String updateImage(final Long uid, final MultipartFile image) {
		// 프로필 사진이 존재하면 삭제
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		String bucketFolder = "profile-image";
		if (user.getImagePath() != null) {
			fireBaseService.deleteFile(bucketFolder, user.getImagePath());
		}

		// 새 프로필 사진 저장
		String imagePath = null;
		String saveFileName = String.valueOf(System.nanoTime());
		if (image != null) {
			try {
				fireBaseService.uploadFiles(image, bucketFolder, saveFileName);    // firebase에 파일 저장
				imagePath = fireBaseService.getFileUrl(bucketFolder, saveFileName); // 파일 경로 저장
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		user.updateImagePath(imagePath);
		return imagePath;
	}

	// 증명 파일 업로드
	@Override
	@Transactional
	public String updateCertificateFile(final Long uid, final MultipartFile file) {
		// 증빙 파일이 존재하면 삭제
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		String bucketFolder = "certificate-file";
		if (user.getCertificatePath() != null) {
			fireBaseService.deleteFile(bucketFolder, user.getCertificatePath());
		}

		// 새 프로필 사진 저장
		String certificatePath = null;
		String saveFileName = String.valueOf(System.nanoTime());
		if (file != null) {
			try {
				fireBaseService.uploadFiles(file, bucketFolder, saveFileName);    // firebase에 파일 저장
				certificatePath = fireBaseService.getFileUrl(bucketFolder, saveFileName); // 파일 경로 저장
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		user.updateCertificatePath(certificatePath);
		return certificatePath;
	}

	// 해류병 발송시 수신 회원 조회
	@Override
	public List<Long> getRandomUserList(final Long uid, final Integer type) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		List<User> userList = userRepository.findAllByType(type);
		userList.remove(user);
		Set<Long> randomUsers = new HashSet<>();
		if (userList.size() <= 3) {
			for (User currUser : userList) {
				randomUsers.add(currUser.getId());
			}
		} else {
			while (randomUsers.size() < 3) {
				int idx = (int)((Math.random() * 1000) % userList.size());
				randomUsers.add(userList.get(idx).getId());
			}
		}
		return new ArrayList<>(randomUsers);
	}

	// 뱃지 획득 정보 생성
	@Override
	public ResponseDto.GetUserBadge createUserBadge(final Long uid, final Long bid) {
		// 뱃지 획득 정보가 미리 있는지 검사
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		Badge badge = badgeRepository.findById(bid).orElseThrow(() -> new CustomException(ErrorCode.BADGE_NOT_FOUND));
		if (userBadgeRepository.countAllByUserAndBadge(user, badge) > 0) {
			throw new CustomException(ErrorCode.USER_BADGE_ALREADY_EXIST);
		}

		// 뱃지 획득 정보 생성 후 저장
		UserBadge userBadge = UserBadge.builder().user(user).badge(badge).regTime(LocalDateTime.now()).build();
		userBadgeRepository.save(userBadge);
		return ResponseDto.GetUserBadge.builder()
			.infoId(userBadge.getId())
			.user(new ResponseDto.GetUserPreview(userBadge.getUser()))
			.badge(new ResponseDto.GetBadge(userBadge.getBadge()))
			.regTime(userBadge.getRegTime())
			.build();
	}

	// 뱃지 상세 조회
	@Override
	public ResponseDto.GetUserBadgeInfo getBadgeList(final Long uid) {
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		List<UserBadge> userBadgeList = userBadgeRepository.findAllByUser(user);
		List<ResponseDto.GetBadge> badgeList = new ArrayList<>();
		for (UserBadge userBadge : userBadgeList) {
			badgeList.add(new ResponseDto.GetBadge(userBadge.getBadge()));
		}
		return ResponseDto.GetUserBadgeInfo.builder()
			.userNickname(user.getNickname())
			.badgeList(badgeList)
			.build();
	}

	// 회원 로그인
	@Override
	public ResponseDto.GetUserPreview loginUser(final RequestDto.LoginUser requestDto) {
		if (userRepository.countByEmail(requestDto.getEmail()) == 0) {
			throw new CustomException(ErrorCode.EMAIL_NOT_FOUND);
		}
		User user = userRepository.findByEmail(requestDto.getEmail());
		if (!user.getPassword().equals(requestDto.getPassword())) {
			throw new CustomException(ErrorCode.LOGIN_FAILED);
		}
		return new ResponseDto.GetUserPreview(user);
	}

	// 사용자 맞춤형 FAQ 추천
	@Override
	public ResponseDto.GetFaq getFaq(final Long uid, final Map<String, String> requestMap) {
		// 카테고리 리스트에 요소 추가
		User user = userRepository.findById(uid).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
		List<String> categories = new ArrayList<>();
		categories.add("주거");
		categories.add("금융");
		categories.add("심리");
		final String pattern = "[^\\uAC00-\\uD7A3]+";

		// 카테고리마다 전처리 데이터셋을 가져와 map에 저장
		// map에는 (keyword, [2의 idx제곱]) 의 value가 저장됨
		// 이미 존재하는 key일 경우에는 기존 value에 덧셈하여 저장
		Map<String, Integer> wordMap = new HashMap<>();
		for (int idx = 0; idx < categories.size(); idx++) {
			try {
				BufferedReader br = new BufferedReader(
					new FileReader("src/main/resources/keywords/output" + categories.get(idx)));
				String line = "";
				while ((line = br.readLine()) != null) {
					String[] arr = line.split(pattern);
					// 이미 등록되어 있는 키워드면 value에 추가
					for (String str : arr) {
						Integer value = (1 << idx);
						if (wordMap.get(str) != null) {
							value += wordMap.get(str);
						}
						// map에 갱신
						wordMap.put(str, value);
					}
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		// 어떤 카테고리와 가장 연관이 많은지 검사
		String content = requestMap.get("content");
		String[] words = content.split(pattern);
		int[] scores = new int[categories.size()];
		for (String word : words) {
			Integer value = wordMap.get(word);
			// System.out.println(word + ": " + value);
			if (value == null) {
				continue;
			}
			// 비트마스킹을 사용하여 각 카테고리에 등장한 횟수 체크
			for (int idx = 0; idx < categories.size(); idx++) {
				scores[idx] += (value >> (idx)) & 1;
			}
		}

		// 가장 연관있는 카테고리 찾기
		int maxValueIdx = -1;
		int maxValue = -1;
		for (int i = 0; i < scores.length; i++) {
			System.out.println(categories.get(i) + ": " + scores[i] + "점");
			if (maxValue < scores[i]) {
				maxValueIdx = i;
				maxValue = scores[i];
			}
		}
		String recommendedCategory = categories.get(maxValueIdx);

		// 카테고리 기반에 해당되는 FAQ 리스트 가져오기
		List<Faq> faqList = faqRepository.findAllByCategory(recommendedCategory);
		Queue<Faq> nonRegionFaqs = new LinkedList<>();

		// 사용자 지역에서 시 이름을 추출
		String cityName = "무관";
		if (user.getRegion() != null) {
			String[] regions = user.getRegion().split(" ");
			cityName = regions[0];
		}
		// 시 이름의 기준을 변경할 경우 문자열 조작 필요
		// for (String region : regions) {
		// 	char ch = region.charAt(region.length() - 1);
		// 	if (ch == '시' || ch == '군') {
		// 		for (int i = 0; i < region.length() - 1; i++) {
		// 			cityName += region.charAt(i);
		// 		}
		// 		break;
		// 	}
		// }

		// 사용자의 지역이 일치하는 FAQ가 있으면 반환
		for (Faq faq : faqList) {
			if (faq.getRegion().equals("무관")) {
				nonRegionFaqs.add(faq);
			} else if (faq.getRegion().equals(cityName)) {
				return new ResponseDto.GetFaq(faq);
			}
		}

		// 사용자와 지역이 일치하는 FAQ가 없으면 무관한 것들 중 하나를 뽑아 반환
		if (!nonRegionFaqs.isEmpty()) {
			return new ResponseDto.GetFaq(nonRegionFaqs.poll());
		}
		return new ResponseDto.GetFaq();
	}
}
