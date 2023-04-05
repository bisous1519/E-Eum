package com.craypas.bottle.model.repository;

import static com.craypas.bottle.model.entity.QReqBottle.*;
import static com.craypas.bottle.model.entity.QResBottle.*;
import static com.craypas.bottle.model.entity.QUserReqBottle.*;
import static com.querydsl.core.group.GroupBy.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.craypas.bottle.model.dto.response.CheckedResBottleDto;
import com.craypas.bottle.model.dto.response.DetailReqBottleDto;
import com.craypas.bottle.model.dto.response.QCheckedResBottleDto;
import com.craypas.bottle.model.dto.response.QDetailReqBottleDto;
import com.craypas.bottle.model.dto.response.QReceivedTypeReqBottleDto;
import com.craypas.bottle.model.dto.response.QSummaryBottleDto;
import com.craypas.bottle.model.dto.response.ReceivedTypeReqBottleDto;
import com.craypas.bottle.model.dto.response.SummaryBottleDto;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
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
				reqBottle.id, reqBottle.writerId, reqBottle.content, reqBottle.type, reqBottle.sentiment,
				Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", reqBottle.regTime),
				reqBottle.status, reqBottle.resRead,
				list(new QCheckedResBottleDto(resBottle.id, resBottle.content, resBottle.ttsPath,
					Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", resBottle.regTime),
					resBottle.status))
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

	public List<SummaryBottleDto> findAllReqBottleWithResCntByWriterId(long id) {
		Map<Long, SummaryBottleDto> resultMap = jpaQueryFactory
			.from(reqBottle)
			.leftJoin(reqBottle.userReqBottles, userReqBottle).on(userReqBottle.reqBottle.id.eq(reqBottle.id))
			.leftJoin(userReqBottle.resBottles, resBottle).on(resBottle.userReqBottleId.eq(userReqBottle.id))
			.where(reqBottle.writerId.eq(id))
			.transform(groupBy(reqBottle.id).as(new QSummaryBottleDto(
				reqBottle.id, reqBottle.content, reqBottle.type, reqBottle.sentiment,
				Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", reqBottle.regTime), reqBottle.type,
				list(new QCheckedResBottleDto(resBottle.id, resBottle.content, resBottle.ttsPath,
					Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", resBottle.regTime),
					resBottle.status))
			)));

		int cnt = 0;
		for (SummaryBottleDto summaryBottleDto : resultMap.values()) {
			for (CheckedResBottleDto resBottleDto : summaryBottleDto.getResBottles()) {
				if (resBottleDto.getId() > 0L) cnt++;
			}
			summaryBottleDto.setResCnt(cnt);
			cnt = 0;
		}
		return resultMap.values().stream().collect(Collectors.toList());
	}

	public List<ReceivedTypeReqBottleDto> findAllResBottleByReqWriterIdAndType(long id, int reqBottletype) {
		return jpaQueryFactory
			.select(new QReceivedTypeReqBottleDto(reqBottle.id, reqBottle.writerId, reqBottle.content, reqBottle.sentiment, reqBottle.ttsPath,
				Expressions.stringTemplate("DATE_FORMAT({0},'%Y-%m-%d %H:%i:%s')", reqBottle.regTime),
				reqBottle.status, userReqBottle.receiverRead
			))
			.from(reqBottle)
			.leftJoin(reqBottle.userReqBottles, userReqBottle).on(userReqBottle.reqBottle.id.eq(reqBottle.id))
			.where(userReqBottle.receiverId.eq(id), reqBottle.type.eq(reqBottletype))
			.fetch();
	}
}
