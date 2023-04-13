package com.craypas.bottle.model.dto.request;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.craypas.bottle.model.entity.Like;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

class CreateLikeDtoTest {
	/**
	 * Method under test: {@link CreateLikeDto#toEntity()}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testToEntity() {
		// TODO: Complete this test.
		//   Reason: R013 No inputs found that don't throw a trivial exception.
		//   Diffblue Cover tried to run the arrange/act section, but the method under
		//   test threw
		//   java.lang.NullPointerException
		//       at com.craypas.bottle.model.dto.request.CreateLikeDto.toEntity(CreateLikeDto.java:24)
		//   See https://diff.blue/R013 to resolve this issue.

		(new CreateLikeDto()).toEntity();
	}

	/**
	 * Method under test: {@link CreateLikeDto#toEntity()}
	 */
	@Test
	@Disabled("TODO: Complete this test")
	void testToEntity2() {
		// TODO: Complete this test.
		//   Reason: R013 No inputs found that don't throw a trivial exception.
		//   Diffblue Cover tried to run the arrange/act section, but the method under
		//   test threw
		//   java.lang.NullPointerException
		//       at com.craypas.bottle.model.dto.request.CreateLikeDto.toEntity(CreateLikeDto.java:24)
		//   See https://diff.blue/R013 to resolve this issue.

		CreateLikeDto createLikeDto = new CreateLikeDto();
		createLikeDto.setUserId(1L);
		createLikeDto.toEntity();
	}

	/**
	 * Method under test: {@link CreateLikeDto#toEntity()}
	 */
	@Test
	void testToEntity3() {
		CreateLikeDto createLikeDto = new CreateLikeDto();
		createLikeDto.setResBottleId(1L);
		createLikeDto.setUserId(2L);
		Like actualToEntityResult = createLikeDto.toEntity();
		assertEquals(0L, actualToEntityResult.getId());
		assertEquals(2L, actualToEntityResult.getUserId());
		assertEquals(1L, actualToEntityResult.getResBottleId());
	}
}

