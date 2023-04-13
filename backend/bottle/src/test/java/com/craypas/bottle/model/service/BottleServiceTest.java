package com.craypas.bottle.model.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.anyBoolean;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.craypas.bottle.exception.CustomException;
import com.craypas.bottle.exception.ErrorCode;
import com.craypas.bottle.model.dto.request.CreateReqBottleDto;
import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.entity.ReqBottle;
import com.craypas.bottle.model.entity.UserReqBottle;
import com.craypas.bottle.model.repository.LikeRepository;
import com.craypas.bottle.model.repository.QBottleRepository;
import com.craypas.bottle.model.repository.ReportRepository;
import com.craypas.bottle.model.repository.ReqBottleRepository;
import com.craypas.bottle.model.repository.ResBottleRepository;
import com.craypas.bottle.model.repository.UserReqBottleRepository;

import java.time.LocalDate;
import java.time.ZoneOffset;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {BottleService.class})
@ExtendWith(SpringExtension.class)
class BottleServiceTest {
	@Autowired
	private BottleService bottleService;

	@MockBean
	private LikeRepository likeRepository;

	@MockBean
	private QBottleRepository qBottleRepository;

	@MockBean
	private ReportRepository reportRepository;

	@MockBean
	private ReqBottleRepository reqBottleRepository;

	@MockBean
	private ResBottleRepository resBottleRepository;

	@MockBean
	private UserReqBottleRepository userReqBottleRepository;

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles() {
		CreateReqBottleDto reqBottleDto = new CreateReqBottleDto();
		assertThrows(CustomException.class, () -> bottleService.sendReqBottles(reqBottleDto, new ArrayList<>()));
	}

	/**
	 * Method under test:vv\@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testSendReqBottles2() {
		// TODO: Complete this test.
		//   Reason: R013 No inputs found that don't throw a trivial exception.
		//   Diffblue Cover tried to run the arrange/act section, but the method under
		//   test threw
		//   java.lang.NullPointerException
		//       at com.craypas.bottle.model.service.BottleService.sendReqBottles(BottleService.java:55)
		//   See https://diff.blue/R013 to resolve this issue.

		bottleService.sendReqBottles(null, new ArrayList<>());
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testSendReqBottles3() {
		// TODO: Complete this test.
		//   Reason: R013 No inputs found that don't throw a trivial exception.
		//   Diffblue Cover tried to run the arrange/act section, but the method under
		//   test threw
		//   java.lang.NullPointerException
		//       at java.util.Calendar.setTime(Calendar.java:1770)
		//       at java.text.SimpleDateFormat.format(SimpleDateFormat.java:943)
		//       at java.text.SimpleDateFormat.format(SimpleDateFormat.java:936)
		//       at java.text.DateFormat.format(DateFormat.java:345)
		//       at com.craypas.bottle.model.entity.ReqBottle.stringConverter(ReqBottle.java:101)
		//       at com.craypas.bottle.model.entity.ReqBottle.toCreatedDto(ReqBottle.java:76)
		//       at com.craypas.bottle.model.service.BottleService.sendReqBottles(BottleService.java:66)
		//   See https://diff.blue/R013 to resolve this issue.

		ReqBottle reqBottle = new ReqBottle();
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);

		ReqBottle reqBottle2 = new ReqBottle();
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);

		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");

		bottleService.sendReqBottles(reqBottleDto, new ArrayList<>());
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles4() {
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenThrow(
			new CustomException(ErrorCode.INVALID_INPUT));

		ReqBottle reqBottle = new ReqBottle();
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");
		assertThrows(CustomException.class, () -> bottleService.sendReqBottles(reqBottleDto, new ArrayList<>()));
		verify(reqBottleRepository).save(Mockito.<ReqBottle>any());
		verify(reqBottleDto).toEntity();
		verify(reqBottleDto).getSentiment();
		verify(reqBottleDto).getType();
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles5() {
		Date regTime = Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());

		ReqBottle reqBottle = new ReqBottle(1L, 1L, "Not all who wander are lost", "yyyy-MM-dd HH:mm:ss", 1, 1, regTime,
			1, true, new ArrayList<>());
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);

		ReqBottle reqBottle2 = new ReqBottle();
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");
		CreatedReqBottleDto actualSendReqBottlesResult = bottleService.sendReqBottles(reqBottleDto, new ArrayList<>());
		assertEquals("Not all who wander are lost", actualSendReqBottlesResult.getContent());
		assertTrue(actualSendReqBottlesResult.isResRead());
		assertEquals(1L, actualSendReqBottlesResult.getWriterId());
		assertEquals("yyyy-MM-dd HH:mm:ss", actualSendReqBottlesResult.getTtsPath());
		assertEquals(1, actualSendReqBottlesResult.getStatus());
		assertEquals(1, actualSendReqBottlesResult.getSentiment());
		assertEquals(1L, actualSendReqBottlesResult.getId());
		verify(reqBottleRepository).save(Mockito.<ReqBottle>any());
		verify(reqBottleDto).toEntity();
		verify(reqBottleDto).getSentiment();
		verify(reqBottleDto).getType();
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles6() {
		ReqBottle reqBottle = mock(ReqBottle.class);
		CreatedReqBottleDto createdReqBottleDto = new CreatedReqBottleDto(1L, 1L, "Not all who wander are lost", 1,
			"Tts Path", "Reg Time", 1, true);

		when(reqBottle.toCreatedDto()).thenReturn(createdReqBottleDto);
		doNothing().when(reqBottle).updateResRead(anyBoolean());
		doNothing().when(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);

		ReqBottle reqBottle2 = new ReqBottle();
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");
		assertSame(createdReqBottleDto, bottleService.sendReqBottles(reqBottleDto, new ArrayList<>()));
		verify(reqBottleRepository).save(Mockito.<ReqBottle>any());
		verify(reqBottle).toCreatedDto();
		verify(reqBottle).updateResRead(anyBoolean());
		verify(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		verify(reqBottleDto).toEntity();
		verify(reqBottleDto).getSentiment();
		verify(reqBottleDto).getType();
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles7() {
		ReqBottle reqBottle = mock(ReqBottle.class);
		CreatedReqBottleDto createdReqBottleDto = new CreatedReqBottleDto(1L, 1L, "Not all who wander are lost", 1,
			"Tts Path", "Reg Time", 1, true);

		when(reqBottle.toCreatedDto()).thenReturn(createdReqBottleDto);
		doNothing().when(reqBottle).updateResRead(anyBoolean());
		doNothing().when(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);
		ReqBottle reqBottle2 = mock(ReqBottle.class);
		doNothing().when(reqBottle2).updateResRead(anyBoolean());
		doNothing().when(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");
		assertSame(createdReqBottleDto, bottleService.sendReqBottles(reqBottleDto, new ArrayList<>()));
		verify(reqBottleRepository).save(Mockito.<ReqBottle>any());
		verify(reqBottle).toCreatedDto();
		verify(reqBottle).updateResRead(anyBoolean());
		verify(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		verify(reqBottleDto).toEntity();
		verify(reqBottleDto).getSentiment();
		verify(reqBottleDto).getType();
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
		verify(reqBottle2).updateResRead(anyBoolean());
		verify(reqBottle2, atLeast(1)).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles8() {
		ReqBottle reqBottle = mock(ReqBottle.class);
		when(reqBottle.toCreatedDto()).thenReturn(
			new CreatedReqBottleDto(1L, 1L, "Not all who wander are lost", 1, "Tts Path", "Reg Time", 1, true));
		doNothing().when(reqBottle).updateResRead(anyBoolean());
		doNothing().when(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);
		ReqBottle reqBottle2 = mock(ReqBottle.class);
		doNothing().when(reqBottle2).updateResRead(anyBoolean());
		doNothing().when(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(null);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");
		assertThrows(CustomException.class, () -> bottleService.sendReqBottles(reqBottleDto, new ArrayList<>()));
		verify(reqBottle).updateResRead(anyBoolean());
		verify(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		verify(reqBottleDto).getSentiment();
		verify(reqBottleDto).getType();
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
		verify(reqBottle2).updateResRead(anyBoolean());
		verify(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles9() {
		ReqBottle reqBottle = mock(ReqBottle.class);
		when(reqBottle.toCreatedDto()).thenReturn(
			new CreatedReqBottleDto(1L, 1L, "Not all who wander are lost", 1, "Tts Path", "Reg Time", 1, true));
		doNothing().when(reqBottle).updateResRead(anyBoolean());
		doNothing().when(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);
		ReqBottle reqBottle2 = mock(ReqBottle.class);
		doNothing().when(reqBottle2).updateResRead(anyBoolean());
		doNothing().when(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(null);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");
		assertThrows(CustomException.class, () -> bottleService.sendReqBottles(reqBottleDto, new ArrayList<>()));
		verify(reqBottle).updateResRead(anyBoolean());
		verify(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		verify(reqBottleDto).getType();
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
		verify(reqBottle2).updateResRead(anyBoolean());
		verify(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles10() {
		ReqBottle reqBottle = mock(ReqBottle.class);
		when(reqBottle.toCreatedDto()).thenReturn(
			new CreatedReqBottleDto(1L, 1L, "Not all who wander are lost", 1, "Tts Path", "Reg Time", 1, true));
		doNothing().when(reqBottle).updateResRead(anyBoolean());
		doNothing().when(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);
		ReqBottle reqBottle2 = mock(ReqBottle.class);
		doNothing().when(reqBottle2).updateResRead(anyBoolean());
		doNothing().when(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn(null);
		assertThrows(CustomException.class, () -> bottleService.sendReqBottles(reqBottleDto, new ArrayList<>()));
		verify(reqBottle).updateResRead(anyBoolean());
		verify(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
		verify(reqBottle2).updateResRead(anyBoolean());
		verify(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
	}

	/**
	 * Method under test: {@link BottleService#sendReqBottles(CreateReqBottleDto, List)}
	 */
	@Test
	void testSendReqBottles11() {
		ReqBottle reqBottle = mock(ReqBottle.class);
		CreatedReqBottleDto createdReqBottleDto = new CreatedReqBottleDto(1L, 1L, "Not all who wander are lost", 1,
			"Tts Path", "Reg Time", 1, true);

		when(reqBottle.toCreatedDto()).thenReturn(createdReqBottleDto);
		doNothing().when(reqBottle).updateResRead(anyBoolean());
		doNothing().when(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle.updateResRead(true);
		reqBottle.updateUserReqBottles(new ArrayList<>());
		when(reqBottleRepository.save(Mockito.<ReqBottle>any())).thenReturn(reqBottle);
		ReqBottle reqBottle2 = mock(ReqBottle.class);
		doNothing().when(reqBottle2).updateResRead(anyBoolean());
		doNothing().when(reqBottle2).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		reqBottle2.updateResRead(true);
		reqBottle2.updateUserReqBottles(new ArrayList<>());
		CreateReqBottleDto reqBottleDto = mock(CreateReqBottleDto.class);
		when(reqBottleDto.toEntity()).thenReturn(reqBottle2);
		when(reqBottleDto.getSentiment()).thenReturn(1);
		when(reqBottleDto.getType()).thenReturn(1);
		when(reqBottleDto.getWriterId()).thenReturn(1L);
		when(reqBottleDto.getContent()).thenReturn("Not all who wander are lost");

		ArrayList<Integer> userId = new ArrayList<>();
		userId.add(2);
		assertSame(createdReqBottleDto, bottleService.sendReqBottles(reqBottleDto, userId));
		verify(reqBottleRepository).save(Mockito.<ReqBottle>any());
		verify(reqBottle).toCreatedDto();
		verify(reqBottle).updateResRead(anyBoolean());
		verify(reqBottle).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
		verify(reqBottleDto).toEntity();
		verify(reqBottleDto).getSentiment();
		verify(reqBottleDto).getType();
		verify(reqBottleDto).getWriterId();
		verify(reqBottleDto).getContent();
		verify(reqBottle2).updateResRead(anyBoolean());
		verify(reqBottle2, atLeast(1)).updateUserReqBottles(Mockito.<List<UserReqBottle>>any());
	}
}

