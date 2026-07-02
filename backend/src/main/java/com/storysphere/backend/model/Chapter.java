package com.storysphere.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "CHAPTERS")
public class Chapter {

    @Id
    @SequenceGenerator(
            name = "chapter_seq",
            sequenceName = "chapter_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "chapter_seq"
    )
    private Long id;

    private Long bookId;

    private Integer chapterNumber;

    private String chapterTitle;

    @Column(length = 10000)
    private String content;

    @Column(name = "CREATED_BY")
    private String createdBy;

    private String status;

    private String pendingChapterTitle;

private Integer pendingChapterNumber;

@Column(length = 10000)
private String pendingContent;

    // Default Constructor
    public Chapter() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(
            Long bookId
    ) {
        this.bookId = bookId;
    }

    public Integer getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(
            Integer chapterNumber
    ) {
        this.chapterNumber = chapterNumber;
    }

    public String getChapterTitle() {
        return chapterTitle;
    }

    public void setChapterTitle(
            String chapterTitle
    ) {
        this.chapterTitle = chapterTitle;
    }

    public String getContent() {
        return content;
    }

    public void setContent(
            String content
    ) {
        this.content = content;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(
            String createdBy
    ) {
        this.createdBy = createdBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status
    ) {
        this.status = status;
    }

    public String getPendingChapterTitle() {
    return pendingChapterTitle;
}

public void setPendingChapterTitle(String pendingChapterTitle) {
    this.pendingChapterTitle = pendingChapterTitle;
}

public Integer getPendingChapterNumber() {
    return pendingChapterNumber;
}

public void setPendingChapterNumber(Integer pendingChapterNumber) {
    this.pendingChapterNumber = pendingChapterNumber;
}

public String getPendingContent() {
    return pendingContent;
}

public void setPendingContent(String pendingContent) {
    this.pendingContent = pendingContent;
}
}