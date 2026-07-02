package com.storysphere.backend.dto;

public class ReadingHistoryResponse {

    private Long bookId;

    private Long chapterId;

    private Integer chapterNumber;

    private String title;

    private String coverImage;

    public ReadingHistoryResponse() {
    }

    public ReadingHistoryResponse(
            Long bookId,
            Long chapterId,
            Integer chapterNumber,
            String title,
            String coverImage
    ) {
        this.bookId = bookId;
        this.chapterId = chapterId;
        this.chapterNumber = chapterNumber;
        this.title = title;
        this.coverImage = coverImage;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

}