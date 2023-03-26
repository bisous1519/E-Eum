package com.craypas.bottle.model.repository;

import static com.craypas.bottle.model.entity.QReqBottle.*;
import static com.craypas.bottle.model.entity.QResBottle.*;
import static com.craypas.bottle.model.entity.QUserReqBottle.*;
import static com.querydsl.core.group.GroupBy.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.craypas.bottle.model.dto.response.CheckedResBottleDto;
import com.craypas.bottle.model.dto.response.CreatedResBottleDto;
import com.craypas.bottle.model.dto.response.DetailReqBottleDto;
import com.craypas.bottle.model.dto.response.QCheckedResBottleDto;
import com.craypas.bottle.model.dto.response.QCreatedResBottleDto;
import com.craypas.bottle.model.dto.response.QDetailReqBottleDto;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class QBottleRepository {

	private final JPAQueryFactory jpaQueryFactory;

	public DetailReqBottleDto findAllResBottleByReqBottleId(long id) {
		Map<Long, DetailReqBottleDto> resultMap = jpaQueryFactory
			.from(reqBottle)
			.leftJoin(reqBottle.userReqBottles, userReqBottle).on(userReqBottle.reqBottle.id.eq(reqBottle.id))
			.leftJoin(userReqBottle.resBottles, resBottle).on(resBottle.userReqBottleId.eq(userReqBottle.id))
			.where(reqBottle.id.eq(id))
			.transform(groupBy(reqBottle.id).as(new QDetailReqBottleDto(
				reqBottle.id, reqBottle.content, reqBottle.type, reqBottle.sentiment, Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", reqBottle.regTime), reqBottle.status,
				list(new QCheckedResBottleDto(resBottle.id, resBottle.content, Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", resBottle.regTime), resBottle.status))
			)));

		DetailReqBottleDto detailReqBottleDto = new DetailReqBottleDto();
		List<CheckedResBottleDto> resBottles = new ArrayList<>();
		if (!resultMap.isEmpty()) {
			detailReqBottleDto = resultMap.values().iterator().next();
			for(CheckedResBottleDto resBottleDto : detailReqBottleDto.getResBottles()) {
				if(resBottleDto.getId() == 0L)	continue;
				resBottles.add(resBottleDto);
			}
		}
		detailReqBottleDto.setResBottles(resBottles);
		return detailReqBottleDto;
	}

	public List<CreatedResBottleDto> findAllResBottleByReqWriterId(long id) {
		return jpaQueryFactory
			.select(new QCreatedResBottleDto(resBottle.id, userReqBottle.id, resBottle.content, resBottle.sentiment, resBottle.ttsPath
				, Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", resBottle.regTime)
				, resBottle.status))
			.from(reqBottle)
			.leftJoin(reqBottle.userReqBottles, userReqBottle).on(userReqBottle.reqBottle.id.eq(reqBottle.id))
			.leftJoin(userReqBottle.resBottles, resBottle).on(resBottle.userReqBottleId.eq(userReqBottle.id))
			.where(reqBottle.writerId.eq(id))
			.fetch();
	}
}
