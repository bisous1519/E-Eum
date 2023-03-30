package com.craypas.user.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.user.model.entity.Sponsorship;
import com.craypas.user.model.entity.User;

@Repository
public interface SponsorshipRepository extends JpaRepository<Sponsorship, Long> {
	Integer countAllByUserAndSponsorId(User user, Long sponsorId);

	Sponsorship findByUserAndSponsorId(User user, Long sponsorId);
}
