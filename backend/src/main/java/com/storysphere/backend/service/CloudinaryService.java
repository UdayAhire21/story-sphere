package com.storysphere.backend.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    // Upload Image
    public Map<String, String> uploadImage(
            MultipartFile file
    ) throws IOException {

        Map<?, ?> uploadResult =
                cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.emptyMap()
                );
                System.out.println("Upload Result: " + uploadResult);
        Map<String, String> result =
                new HashMap<>();

        result.put(
                "imageUrl",
                uploadResult.get("secure_url").toString()
        );

        result.put(
                "publicId",
                uploadResult.get("public_id").toString()
        );
        
        return result;
    }

    // Delete Image
    public void deleteImage(
            String publicId
    ) throws IOException {

        if (
                publicId != null &&
                !publicId.isBlank()
        ) {

            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.emptyMap()
            );
        }
    }
}