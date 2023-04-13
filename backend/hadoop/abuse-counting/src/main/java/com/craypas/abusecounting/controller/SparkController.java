package com.craypas.abusecounting.controller;

import com.craypas.abusecounting.model.dto.ContentDto;
import com.craypas.abusecounting.service.SparkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/spark")
public class SparkController {
    private final SparkService sparkService;

    @PostMapping("/abuse-counting")
    public ResponseEntity<?> countAbusiveWord(@RequestBody ContentDto content) {
        try {
            return new ResponseEntity<>(sparkService.calculateAbusePercentage(content.getContent()), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("서버 내부 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
