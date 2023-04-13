package com.craypas.bottle.model.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.craypas.bottle.model.dto.response.CreatedReqBottleDto;
import com.craypas.bottle.model.dto.response.SummaryBottleDto;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;

class ReqBottleTest {
	/**
	 * Method under test: {@link ReqBottle#toCreatedDto()}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testToCreatedDto() {
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
		//   See https://diff.blue/R013 to resolve this issue.

		(new ReqBottle()).toCreatedDto();
	}

	/**
	 * Method under test: {@link ReqBottle#toCreatedDto()}
	 */
	@Test
	void testToCreatedDto2() {
		Date regTime = Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
		CreatedReqBottleDto actualToCreatedDtoResult = (new ReqBottle(1L, 1L, "Not all who wander are lost",
			"yyyy-MM-dd HH:mm:ss", 1, 1, regTime, 1, true, new ArrayList<>())).toCreatedDto();
		assertEquals("Not all who wander are lost", actualToCreatedDtoResult.getContent());
		assertTrue(actualToCreatedDtoResult.isResRead());
		assertEquals(1L, actualToCreatedDtoResult.getWriterId());
		assertEquals("yyyy-MM-dd HH:mm:ss", actualToCreatedDtoResult.getTtsPath());
		assertEquals(1, actualToCreatedDtoResult.getStatus());
		assertEquals(1, actualToCreatedDtoResult.getSentiment());
		assertEquals(1L, actualToCreatedDtoResult.getId());
	}

	/**
	 * Method under test: {@link ReqBottle#toCreatedDto()}
	 */
	@Test
	void testToCreatedDto3() {
		java.sql.Date regTime = mock(java.sql.Date.class);
		when(regTime.getTime()).thenReturn(10L);
		CreatedReqBottleDto actualToCreatedDtoResult = (new ReqBottle(1L, 1L, "Not all who wander are lost",
			"yyyy-MM-dd HH:mm:ss", 1, 1, regTime, 1, true, new ArrayList<>())).toCreatedDto();
		assertEquals("Not all who wander are lost", actualToCreatedDtoResult.getContent());
		assertTrue(actualToCreatedDtoResult.isResRead());
		assertEquals(1L, actualToCreatedDtoResult.getWriterId());
		assertEquals("yyyy-MM-dd HH:mm:ss", actualToCreatedDtoResult.getTtsPath());
		assertEquals(1, actualToCreatedDtoResult.getStatus());
		assertEquals(1, actualToCreatedDtoResult.getSentiment());
		assertEquals(1L, actualToCreatedDtoResult.getId());
		verify(regTime).getTime();
	}

	/**
	 * Method under test: {@link ReqBottle#toSummaryBottleDto()}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testToSummaryBottleDto() {
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
		//       at com.craypas.bottle.model.entity.ReqBottle.toSummaryBottleDto(ReqBottle.java:88)
		//   See https://diff.blue/R013 to resolve this issue.

		(new ReqBottle()).toSummaryBottleDto();
	}

	/**
	 * Method under test: {@link ReqBottle#toSummaryBottleDto()}
	 */
	@Test
	void testToSummaryBottleDto2() {
		Date regTime = Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
		SummaryBottleDto actualToSummaryBottleDtoResult = (new ReqBottle(1L, 1L, "Not all who wander are lost",
			"yyyy-MM-dd HH:mm:ss", 1, 1, regTime, 1, true, new ArrayList<>())).toSummaryBottleDto();
		assertEquals("Not all who wander are lost", actualToSummaryBottleDtoResult.getContent());
		assertEquals(1, actualToSummaryBottleDtoResult.getType().intValue());
		assertEquals(1, actualToSummaryBottleDtoResult.getSentiment().intValue());
		assertNull(actualToSummaryBottleDtoResult.getResCnt());
		assertNull(actualToSummaryBottleDtoResult.getResBottles());
		assertEquals(1L, actualToSummaryBottleDtoResult.getId().longValue());
	}

	/**
	 * Method under test: {@link ReqBottle#toSummaryBottleDto()}
	 */
	@Test
	void testToSummaryBottleDto3() {
		java.sql.Date regTime = mock(java.sql.Date.class);
		when(regTime.getTime()).thenReturn(10L);
		SummaryBottleDto actualToSummaryBottleDtoResult = (new ReqBottle(1L, 1L, "Not all who wander are lost",
			"yyyy-MM-dd HH:mm:ss", 1, 1, regTime, 1, true, new ArrayList<>())).toSummaryBottleDto();
		assertEquals("Not all who wander are lost", actualToSummaryBottleDtoResult.getContent());
		assertEquals(1, actualToSummaryBottleDtoResult.getType().intValue());
		assertEquals(1, actualToSummaryBottleDtoResult.getSentiment().intValue());
		assertNull(actualToSummaryBottleDtoResult.getResCnt());
		assertNull(actualToSummaryBottleDtoResult.getResBottles());
		assertEquals(1L, actualToSummaryBottleDtoResult.getId().longValue());
		verify(regTime).getTime();
	}

	/**
	 * Method under test: {@link ReqBottle#stringConverter(Date)}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testStringConverter() {
		// TODO: Complete this test.
		//   Reason: R031 Method may be time-sensitive.
		//   Diffblue Cover was only able to write tests which were time-sensitive.
		//   The assertions no longer passed when run at an alternate date, time and
		//   timezone. Try refactoring the method to take a java.time.Clock instance so
		//   that the time can be parameterized during testing.
		//   Please see https://diff.blue/R031

		ReqBottle reqBottle = new ReqBottle();
		reqBottle.stringConverter(
			Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
	}

	/**
	 * Method under test: {@link ReqBottle#stringConverter(java.util.Date)}
	 */
	@Test
	void testStringConverter2() {
		ReqBottle reqBottle = new ReqBottle();
		java.sql.Date input = mock(java.sql.Date.class);
		when(input.getTime()).thenReturn(10L);
		reqBottle.stringConverter(input);
		verify(input).getTime();
	}

	/**
	 * Method under test: {@link ReqBottle#stringConverter(Date)}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testStringConverter3() {
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
		//   See https://diff.blue/R013 to resolve this issue.

		(new ReqBottle()).stringConverter(null);
	}

	/**
	 * Methods under test:
	 *
	 * <ul>
	 *   <li>{@link ReqBottle#ReqBottle()}
	 *   <li>{@link ReqBottle#updateResRead(boolean)}
	 *   <li>{@link ReqBottle#updateUserReqBottles(List)}
	 * </ul>
	 */
	@Test
	void testConstructor() {
		ReqBottle actualReqBottle = new ReqBottle();
		actualReqBottle.updateResRead(true);
		ArrayList<UserReqBottle> userReqBottles = new ArrayList<>();
		actualReqBottle.updateUserReqBottles(userReqBottles);
		assertSame(userReqBottles, actualReqBottle.getUserReqBottles());
		assertTrue(actualReqBottle.isResRead());
	}
}

