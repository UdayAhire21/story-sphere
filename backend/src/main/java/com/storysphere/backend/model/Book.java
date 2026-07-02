package com.storysphere.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "BOOK")
public class Book {

    @Id
    @SequenceGenerator(
            name = "book_seq",
            sequenceName = "book_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "book_seq"
    )
    private Long id;

    private String title;

    private String author;

    private String category;

    @Column(length = 5000)
    private String content;

    private String coverImage;

    @Column(name = "CREATED_BY")
    private String createdBy;

    private String status;

    // Pending Update Fields
    private String pendingTitle;

    private String pendingAuthor;

    private String pendingCategory;

    @Column(length = 5000)
    private String pendingContent;

    private String pendingCoverImage;

    private Boolean updatePending = false;

    private String cloudinaryPublicId;

    private String pendingCloudinaryPublicId; 

    // Default Constructor
    public Book() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(
            String title
    ) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(
            String author
    ) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category
    ) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(
            String content
    ) {
        this.content = content;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(
            String coverImage
    ) {
        this.coverImage = coverImage;
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

    public String getPendingTitle() {
        return pendingTitle;
    }

    public void setPendingTitle(
            String pendingTitle
    ) {
        this.pendingTitle = pendingTitle;
    }

    public String getPendingAuthor() {
        return pendingAuthor;
    }

    public void setPendingAuthor(
            String pendingAuthor
    ) {
        this.pendingAuthor = pendingAuthor;
    }

    public String getPendingCategory() {
        return pendingCategory;
    }

    public void setPendingCategory(
            String pendingCategory
    ) {
        this.pendingCategory = pendingCategory;
    }

    public String getPendingContent() {
        return pendingContent;
    }

    public void setPendingContent(
            String pendingContent
    ) {
        this.pendingContent = pendingContent;
    }

    public String getPendingCoverImage() {
        return pendingCoverImage;
    }

    public void setPendingCoverImage(
            String pendingCoverImage
    ) {
        this.pendingCoverImage = pendingCoverImage;
    }

    public Boolean getUpdatePending() {
    return updatePending;
}

public void setUpdatePending(Boolean updatePending) {
    this.updatePending = updatePending;
}

public String getCloudinaryPublicId() {
    return cloudinaryPublicId;
}

public void setCloudinaryPublicId(
        String cloudinaryPublicId
) {
    this.cloudinaryPublicId = cloudinaryPublicId;
}

public String getPendingCloudinaryPublicId() {
    return pendingCloudinaryPublicId;
}

public void setPendingCloudinaryPublicId(String pendingCloudinaryPublicId) {
    this.pendingCloudinaryPublicId = pendingCloudinaryPublicId;
}

}