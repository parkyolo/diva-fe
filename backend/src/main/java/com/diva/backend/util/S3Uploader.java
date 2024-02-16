package com.diva.backend.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public void uploadFile(String uploadPath, MultipartFile file) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType()); // 파일의 Content Type 설정
        metadata.setContentLength(file.getSize());
        try {
            amazonS3.putObject(new PutObjectRequest(bucket, uploadPath, file.getInputStream(), metadata));
//                .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            log.info(e.toString());
        }
    }
}
