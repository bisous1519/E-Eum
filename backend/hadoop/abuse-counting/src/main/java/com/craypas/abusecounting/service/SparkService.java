package com.craypas.abusecounting.service;

import com.craypas.abusecounting.model.dto.AbuseResultDto;
import lombok.RequiredArgsConstructor;
import org.apache.spark.sql.*;
import org.springframework.stereotype.Service;

import static org.apache.spark.sql.functions.*;

@Service
@RequiredArgsConstructor
public class  SparkService {

    private final SparkSession sparkSession;
    public AbuseResultDto calculateAbusePercentage(String message) {
        Dataset<Row> abuseDS = sparkSession.read()
                .option("multiline", true)
                .json("hdfs://localhost:9000/user/hadoop/abuse_data_new.json")
                .select("data.word");

        String[] messageWords = message.split(" ");

        Dataset<Row> explodedDS = abuseDS.select(explode(col("word")).as("word"));
        explodedDS.show();

        for (String messageWord : messageWords) {
            System.out.println(messageWord);
            boolean isContained = explodedDS.filter(expr("INSTR('" + messageWord + "', word) > 0")).count() > 0;
            if (isContained) {
                return AbuseResultDto.builder().isAbuse(true).build();
            }
        }
        return AbuseResultDto.builder().isAbuse(false).build();
    }
}