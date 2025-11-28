package com.example.codereviewapi;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getReview(String codeSnippet) {
        // Construct the prompt
        String prompt = "You are a Senior Code Reviewer. Review the following code. " +
                "Return the response in Markdown format with these sections: " +
                "1. **Detected Issues** " +
                "2. **Suggested Improvements** " +
                "3. **Refactored Code** (in a code block). \n\n" +
                "Code:\n" + codeSnippet;

        // Construct the JSON Request for Gemini
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            )
        );

        // Set Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Build the full URL
        String finalUrl = apiUrl + apiKey;

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // Send Request
            ResponseEntity<Map> response = restTemplate.postForEntity(finalUrl, entity, Map.class);
            
            // Parse Response (Extracting the actual text from deep JSON)
            return extractTextFromResponse(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling Gemini API: " + e.getMessage();
        }
    }

    private String extractTextFromResponse(Map<String, Object> response) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return "Error parsing Gemini response.";
        }
    }
}