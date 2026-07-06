package com.storysphere.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.storysphere.backend.model.ReadingHistory;

@Repository
public interface ReadingHistoryRepository
        extends JpaRepository<ReadingHistory, Long> {

    // Return the first matching history record
    Optional<ReadingHistory> findFirstByUserEmailAndBookId(
            String userEmail,
            Long bookId
    );

    // Return all history of a user
    List<ReadingHistory> findByUserEmail(
            String userEmail
    );

    // Return history sorted by latest read
    List<ReadingHistory> findByUserEmailOrderByLastReadDesc(
            String userEmail
    );

    // Optional: Find all duplicate records of a user for a book
    List<ReadingHistory> findAllByUserEmailAndBookId(
            String userEmail,
            Long bookId
    );

}