package com.craypas.dream.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.craypas.dream.model.dto.tag.RequestDto;
import com.craypas.dream.model.service.TagService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dream/tag")
public class TagController {
	private final TagService tagService;

	@PostMapping
	public ResponseEntity<?> createTag(@Valid @RequestBody final RequestDto.Create requestDto) {
		return new ResponseEntity<>(tagService.createTag(requestDto), HttpStatus.CREATED);
	}

	@GetMapping("/user")
	public ResponseEntity<?> getTagList(@RequestParam("uid") final Long uid) {
		return new ResponseEntity<>(tagService.getTagList(uid), HttpStatus.OK);
	}

	@PutMapping("/{tid}")
	public ResponseEntity<?> updateTag(@PathVariable final Long tid, @RequestBody final String name) {
		return new ResponseEntity<>(tagService.updateTag(tid, name), HttpStatus.OK);
	}

	@DeleteMapping("/{tid}")
	public ResponseEntity<?> deleteTag(@PathVariable final Long tid) {
		tagService.deleteTag(tid);
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
}
