package com.craypas.abusecounting.config;

import lombok.Getter;
import lombok.Setter;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Getter
@Setter
@Configuration
public class SparkConfig {

    @Value("${spark.app.name}")
    private String appName;

    @Value("${spark.master.uri}")
    private String sparkMasterUri;


    @Bean
    @ConditionalOnMissingBean(SparkConf.class)
    public SparkConf sparkConf()  {
        SparkConf sparkConf = new SparkConf()
                .setAppName(appName)
                .set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
                .set("spark.kryoserializer.buffer.max", "2047")
                .set("spark.driver.allowMultipleContexts", "true")
                .setMaster(sparkMasterUri);
        return sparkConf;
    }

    @Bean
    @ConditionalOnMissingBean(JavaSparkContext.class)
    public JavaSparkContext javaSparkContext()  {
        return new JavaSparkContext(sparkConf());
    }

    @Bean
    public SparkSession sparkSession(){
        return SparkSession
                .builder()
                .sparkContext(javaSparkContext().sc())
                .appName(appName)
                .getOrCreate();
    }
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(){
        return new PropertySourcesPlaceholderConfigurer();
    }
}
