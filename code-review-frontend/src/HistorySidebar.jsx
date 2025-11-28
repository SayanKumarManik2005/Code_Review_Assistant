import React from 'react';

const HistorySidebar = ({ history, onLoadHistory, onNewChat }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(undefined, { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="history-container">
      <div className="panel-header">History</div>
      <div className="new-chat-section">
        <button className="new-chat-btn" onClick={onNewChat}>
          <span>+</span> New Chat
        </button>
      </div>
      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-state">
            <p>No history yet.</p>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              className="history-item"
              onClick={() => onLoadHistory(item)}
            >
              <div className="code-preview">
                {item.codeContent.substring(0, 40).replace(/\n/g, ' ')}...
              </div>
              <div className="date-label">
                {formatDate(item.createdAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;