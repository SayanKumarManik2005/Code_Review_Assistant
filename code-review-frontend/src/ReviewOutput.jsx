import React from "react";
import ReactMarkdown from "react-markdown";

const ReviewOutput = ({ review, loading }) => {
  return (
    <div className="output-container">
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Analyzing code...</p>
        </div>
      ) : (
        /* The className 'markdown-body' helps us target CSS */
        <div className="markdown-body">
          <ReactMarkdown>{review}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ReviewOutput;