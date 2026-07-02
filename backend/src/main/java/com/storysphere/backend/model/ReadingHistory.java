package com.storysphere.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "READING_HISTORY")
public class ReadingHistory {

    @Id
    @SequenceGenerator(
            name = "reading_history_seq",
            sequenceName = "reading_history_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "reading_history_seq"
    )
    private Long id;

    private String userEmail;

    private Long bookId;

    private Long chapterId;

    private Integer chapterNumber;

    private LocalDateTime lastRead;

    public ReadingHistory() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }

    public Integer getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(Integer chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public LocalDateTime getLastRead() {
        return lastRead;
    }

    public void setLastRead(LocalDateTime lastRead) {
        this.lastRead = lastRead;
    }

}