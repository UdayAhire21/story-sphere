package com.storysphere.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.storysphere.backend.model.Book;

public interface BookRepository
        extends JpaRepository<Book, Long> {

    List<Book>
    findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
            String title,
            String author
    );

    List<Book> findByCreatedBy(
            String createdBy
    );

    List<Book> findByStatus(
            String status
    );

    List<Book> findByCreatedByAndStatus(
            String createdBy,
            String status
    );

    // NEW
    List<Book> findByUpdatePending(
            Boolean updatePending
    );
}