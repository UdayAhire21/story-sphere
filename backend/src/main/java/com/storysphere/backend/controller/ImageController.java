package com.storysphere.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.storysphere.backend.service.CloudinaryService;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "*")
public class ImageController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(

            @RequestParam("file")
            MultipartFile file

    ) {

        try {

            Map<String, String> result =
                    cloudinaryService.uploadImage(file);

            return ResponseEntity.ok(result);

        } catch (IOException e) {

            return ResponseEntity
                    .badRequest()
                    .body("Image Upload Failed");

        }

    }

}