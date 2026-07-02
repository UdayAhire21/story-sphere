package com.storysphere.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.storysphere.backend.model.Chapter;

public interface ChapterRepository
        extends JpaRepository<Chapter, Long> {

    // Get all chapters of a book ordered by chapter number
    List<Chapter> findByBookIdOrderByChapterNumber(
            Long bookId
    );

    // Get chapters created by a specific user
    List<Chapter> findByCreatedBy(
            String createdBy
    );

    // Get chapters by status
    List<Chapter> findByStatus(
            String status
    );

    // Get chapters of a specific book with a specific status
    List<Chapter> findByBookIdAndStatusOrderByChapterNumber(
            Long bookId,
            String status
    );

    // Get chapters by creator and status
    List<Chapter> findByCreatedByAndStatus(
            String createdBy,
            String status
    );
}