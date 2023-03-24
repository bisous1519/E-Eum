package com.craypas.bottle.model.repository;

import static com.craypas.bottle.model.entity.QReqBottle.*;
import static com.craypas.bottle.model.entity.QResBottle.*;
import static com.craypas.bottle.model.entity.QUserReqBottle.*;
import static com.querydsl.core.group.GroupBy.*;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.craypas.bottle.model.dto.response.DetailReqBottleDto;
import com.craypas.bottle.model.dto.response.QDetailReqBottleDto;
import com.craypas.bottle.model.dto.response.QResBottleDto;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DetailReqBottleRepository {

	private final JPAQueryFactory jpaQueryFactory;

	public DetailReqBottleDto findDetailReqBottle(long id) {
		Map<Long, DetailReqBottleDto> resultMap = jpaQueryFactory
			.from(reqBottle)
			.leftJoin(reqBottle.userReqBottles, userReqBottle).on(userReqBottle.reqBottle.id.eq(reqBottle.id))
			.leftJoin(userReqBottle.resBottles, resBottle).on(resBottle.userReqBottleId.eq(userReqBottle.id))
			.where(reqBottle.id.eq(id))
			.transform(groupBy(reqBottle.id).as(new QDetailReqBottleDto(
				reqBottle.id, reqBottle.content, reqBottle.type, reqBottle.sentiment, Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", reqBottle.regTime), reqBottle.status,
				list(new QResBottleDto(resBottle.id, resBottle.content, Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", resBottle.regTime), resBottle.status))
			)));

		DetailReqBottleDto detailReqBottleDto = new DetailReqBottleDto();
		if (!resultMap.isEmpty()) {
			detailReqBottleDto = resultMap.values().iterator().next();
			if(detailReqBottleDto.getResBottles().get(0).getId() == 0L) {
				detailReqBottleDto.getResBottles().clear();
			}
		}
		return detailReqBottleDto;
	}
}
