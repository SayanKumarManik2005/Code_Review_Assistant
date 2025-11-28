package com.example.codereviewapi;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews") // Explicitly naming the table is good practice
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String codeContent;

    @Column(columnDefinition = "TEXT")
    private String reviewResponse;


private String userId; 

    private LocalDateTime createdAt = LocalDateTime.now();

    // --- MANUAL GETTERS AND SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeContent() {
        return codeContent;
    }

    // This fixes the .setCodeContent() error
    public void setCodeContent(String codeContent) {
        this.codeContent = codeContent;
    }

    public String getReviewResponse() {
        return reviewResponse;
    }

    // This fixes the .setReviewResponse() error
    public void setReviewResponse(String reviewResponse) {
        this.reviewResponse = reviewResponse;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}