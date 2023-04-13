package com.craypas.bottle.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.craypas.bottle.model.entity.ReqBottle;
import com.craypas.bottle.model.entity.UserReqBottle;

public interface UserReqBottleRepository extends JpaRepository<UserReqBottle, Long>  {
	UserReqBottle findByReceiverIdAndReqBottle(Long receiverId, ReqBottle reqBottle);
	List<UserReqBottle> findAllByReceiverId(Long receiverId);
}