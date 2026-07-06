package com.storysphere.backend.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.storysphere.backend.dto.ReadingHistoryResponse;
import com.storysphere.backend.model.Book;
import com.storysphere.backend.model.ReadingHistory;
import com.storysphere.backend.repository.BookRepository;
import com.storysphere.backend.repository.ReadingHistoryRepository;

@RestController
@RequestMapping("/history")
@CrossOrigin(origins = "*")
public class ReadingHistoryController {

    @Autowired
    private ReadingHistoryRepository historyRepository;

    @Autowired
    private BookRepository bookRepository;

    // =====================================
    // Save / Update Reading Progress
    // =====================================

    @PostMapping("/save")
    public ResponseEntity<?> saveHistory(
            @RequestBody ReadingHistory history
    ) {

        if (history.getUserEmail() == null ||
                history.getBookId() == null) {

            return ResponseEntity.badRequest()
                    .body("User Email and Book ID are required.");
        }

        System.out.println("=================================");
        System.out.println("Saving Reading History");
        System.out.println("Book ID       : " + history.getBookId());
        System.out.println("Chapter ID    : " + history.getChapterId());
        System.out.println("Chapter No    : " + history.getChapterNumber());
        System.out.println("User          : " + history.getUserEmail());
        System.out.println("=================================");

        // Find every history entry of this user for this book
        List<ReadingHistory> histories =
                historyRepository.findAllByUserEmailAndBookId(
                        history.getUserEmail(),
                        history.getBookId()
                );

        ReadingHistory readingHistory;

        if (!histories.isEmpty()) {

            // Keep the latest record
            readingHistory = histories.stream()
                    .max(Comparator.comparing(ReadingHistory::getId))
                    .get();

            // Delete duplicate rows
            for (ReadingHistory item : histories) {

                if (!item.getId().equals(readingHistory.getId())) {

                    historyRepository.delete(item);

                }

            }

        } else {

            readingHistory = new ReadingHistory();

            readingHistory.setUserEmail(
                    history.getUserEmail()
            );

            readingHistory.setBookId(
                    history.getBookId()
            );

        }

        readingHistory.setChapterId(
                history.getChapterId()
        );

        readingHistory.setChapterNumber(
                history.getChapterNumber()
        );

        readingHistory.setLastRead(
                LocalDateTime.now()
        );

        ReadingHistory saved =
                historyRepository.save(readingHistory);

        return ResponseEntity.ok(saved);

    }

    // =====================================
    // Get User Reading History
    // =====================================

    @GetMapping("/user/{email}")
    public ResponseEntity<List<ReadingHistoryResponse>> getHistory(
            @PathVariable String email
    ) {

        List<ReadingHistory> historyList =
                historyRepository.findByUserEmailOrderByLastReadDesc(
                        email
                );

        List<ReadingHistoryResponse> response =
                new ArrayList<>();

        for (ReadingHistory history : historyList) {

            Optional<Book> optionalBook =
                    bookRepository.findById(
                            history.getBookId()
                    );

            if (optionalBook.isPresent()) {

                Book book = optionalBook.get();

                response.add(

                        new ReadingHistoryResponse(

                                history.getBookId(),

                                history.getChapterId(),

                                history.getChapterNumber(),

                                book.getTitle(),

                                book.getCoverImage()

                        )

                );

            }

        }

        return ResponseEntity.ok(response);

    }

}