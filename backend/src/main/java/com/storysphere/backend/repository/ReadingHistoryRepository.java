package com.storysphere.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.storysphere.backend.model.ReadingHistory;

public interface ReadingHistoryRepository
        extends JpaRepository<ReadingHistory, Long> {

    // Find reading history for one book of one user
    Optional<ReadingHistory> findByUserEmailAndBookId(
            String userEmail,
            Long bookId
    );

    // Get all reading history of a user
    List<ReadingHistory> findByUserEmail(
            String userEmail
    );

    // Get reading history sorted by latest read
    List<ReadingHistory> findByUserEmailOrderByLastReadDesc(
            String userEmail
    );

}