package com.craypas.user.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.craypas.user.model.entity.Sponsorship;

@Repository
public interface SponsorshipRepository extends JpaRepository<Sponsorship, Long> {

}
