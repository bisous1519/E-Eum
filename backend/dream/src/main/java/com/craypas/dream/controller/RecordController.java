package com.craypas.dream.controller;

import javax.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.craypas.dream.model.dto.record.RequestDto;
import com.craypas.dream.model.service.RecordService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dream/record")
public class RecordController {
	private final RecordService recordService;

	// 꿈 기록 작성
	@PostMapping
	public ResponseEntity<?> createRecord(@Valid @RequestBody final RequestDto.Create record) {
		return new ResponseEntity<>(recordService.createRecord(record), HttpStatus.CREATED);
	}

	// 꿈 기록 단일 조회
	@GetMapping("/{rid}")
	public ResponseEntity<?> getRecord(@PathVariable final Long rid) {
		return new ResponseEntity<>(recordService.getRecord(rid), HttpStatus.OK);
	}

	@GetMapping("/user/{uid}")
	// 꿈 기록 피드 조회
	public ResponseEntity<?> getRecordList(@PathVariable final Long uid, final Pageable pageable) {
		return new ResponseEntity<>(recordService.getRecordList(uid, pageable), HttpStatus.OK);
	}

	@PutMapping("/{rid}")
	// 꿈 기록 수정
	public ResponseEntity<?> updateRecord(@PathVariable final Long rid, @RequestBody final String content) {
		return new ResponseEntity<>(recordService.updateRecord(rid, content), HttpStatus.OK);
	}

	@DeleteMapping("/{rid}")
	// 꿈 기록 삭제
	public ResponseEntity<?> deleteRecord(@PathVariable Long rid) {
		recordService.deleteRecord(rid);
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
}
