package com.example.codereviewapi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.domain.Sort;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Find all reviews for a specific user, sorted by date
    List<Review> findByUserId(String userId, Sort sort);
}