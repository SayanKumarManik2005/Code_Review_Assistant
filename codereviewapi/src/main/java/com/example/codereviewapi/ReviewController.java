package com.example.codereviewapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173") // Allow React Frontend
public class ReviewController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private ReviewRepository reviewRepository;

    
@GetMapping
    public List<Review> getUserHistory(@RequestParam String userId) {
        return reviewRepository.findByUserId(userId, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // 2. Create Review (Save with User ID)
    // We create a helper class "ReviewRequest" to hold the incoming data
    @PostMapping
    public ResponseEntity<String> reviewCode(@RequestBody ReviewRequest request) {
        // Ask Gemini
        String reviewText = geminiService.getReview(request.getCode());

        // Save to DB with User ID
        Review entity = new Review();
        entity.setCodeContent(request.getCode());
        entity.setReviewResponse(reviewText);
        entity.setUserId(request.getUserId()); // <--- Save the ID
        reviewRepository.save(entity);

        return ResponseEntity.ok(reviewText);
    }


    static class ReviewRequest {
        private String code;
        private String userId;

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
    }
}
