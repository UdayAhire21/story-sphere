package com.storysphere.backend.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ReadingHistory saveHistory(
            @RequestBody ReadingHistory history
    ) {

        System.out.println("===============");
System.out.println("BOOK ID : " + history.getBookId());
System.out.println("CHAPTER ID : " + history.getChapterId());
System.out.println("CHAPTER NUMBER : " + history.getChapterNumber());
System.out.println("USER : " + history.getUserEmail());
System.out.println("===============");

        ReadingHistory existingHistory =
                historyRepository
                        .findByUserEmailAndBookId(
                                history.getUserEmail(),
                                history.getBookId()
                        )
                        .orElse(null);

        if (existingHistory != null) {

            existingHistory.setChapterId(
                    history.getChapterId()
            );

            existingHistory.setChapterNumber(
                    history.getChapterNumber()
            );

            existingHistory.setLastRead(
                    LocalDateTime.now()
            );

            return historyRepository.save(
                    existingHistory
            );
        }

        history.setLastRead(
                LocalDateTime.now()
        );

        return historyRepository.save(
                history
        );
    }

    // =====================================
    // Get User Reading History
    // =====================================

    @GetMapping("/user/{email}")
public List<ReadingHistoryResponse> getHistory(
        @PathVariable String email
) {

    List<ReadingHistory> historyList =
            historyRepository
                    .findByUserEmailOrderByLastReadDesc(
                            email
                    );

    List<ReadingHistoryResponse> response =
            new ArrayList<>();

    for (ReadingHistory history : historyList) {

        Book book =
                bookRepository.findById(
                        history.getBookId()
                ).orElse(null);

        if (book != null) {

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

    return response;

}

}