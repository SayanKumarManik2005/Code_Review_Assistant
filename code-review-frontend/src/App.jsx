import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CodeEditor from "./CodeEditor"; // Ensure filename matches exactly
import ReviewOutput from "./ReviewOutput";
import HistorySidebar from "./HistorySidebar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

function App() {
  const DEFAULT_CODE = `// Paste your code here...\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World";\n    return 0;\n}`;
  const DEFAULT_REVIEW = "Click **'Review Code'** to get AI feedback.";

  const [code, setCode] = useState(DEFAULT_CODE);
  const [review, setReview] = useState(DEFAULT_REVIEW);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const { user, isLoaded } = useUser();

  // Smart URL Selection
  const API_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:8080/api/reviews" 
    : "https://code-review-backend.onrender.com/api/reviews"; 

  useEffect(() => {
    if (isLoaded && user) {
      fetchHistory();
    }
  }, [isLoaded, user]);

  const fetchHistory = async () => {
    if (!user) return;
    try {
      const response = await axios.get(API_URL, { params: { userId: user.id } });
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const reviewCode = async () => {
    if (!user) return alert("Please sign in first!");
    setLoading(true);
    setReview(""); 

    try {
      const response = await axios.post(API_URL, {
        code: code,
        userId: user.id
      });
      setReview(response.data);
      fetchHistory(); 
    } catch (error) {
      setReview(` **Error:** Could not connect to backend.`);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setCode(DEFAULT_CODE);
    setReview(DEFAULT_REVIEW);
  };

  if (!isLoaded) return <div className="loading-state">Loading...</div>;

  return (
    <div className="app-container">
      <header>
        <div className="header-left">
          <SignedIn>
            <button 
              className="sidebar-toggle" 
              onClick={() => setShowSidebar(!showSidebar)}
              title="Toggle Sidebar"
            >
              {showSidebar ? "◀" : "☰"}
            </button>
          </SignedIn>
          <h1>Code Review Assistant</h1>
        </div>

        <div className="auth-section">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="login-btn">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <SignedIn>
        <div className="controls-bar">
          <button className="review-btn" onClick={reviewCode} disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : "Review Code"}
          </button>
        </div>

        <PanelGroup direction="horizontal" className="main-content">
          
          {showSidebar && (
            <>
              <Panel defaultSize={20} minSize={15} maxSize={30}>
                <div className="pane">
                  <HistorySidebar 
                    history={history} 
                    onLoadHistory={(item) => {
                      setCode(item.codeContent);
                      setReview(item.reviewResponse);
                    }}
                    onNewChat={handleNewChat}
                  />
                </div>
              </Panel>
              <PanelResizeHandle className="resize-handle" />
            </>
          )}

          <Panel defaultSize={showSidebar ? 40 : 50} minSize={30}>
            <div className="pane">
              <div className="panel-header">Input Code</div>
              <div className="editor-wrapper">
                <CodeEditor code={code} setCode={setCode} />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* RIGHT PANEL: AI OUTPUT */}
          <Panel defaultSize={showSidebar ? 40 : 50} minSize={30}>
            <div className="pane">
              <div className="panel-header">AI Review</div>
              
              {/* This className "output-wrapper" is crucial for the CSS fix */}
              <div className="output-wrapper">
                <ReviewOutput review={review} loading={loading} />
              </div>
              
            </div>
          </Panel>

        </PanelGroup>
      </SignedIn>

      <SignedOut>
        <div className="welcome-screen">
          <h2>Welcome to Code Review Assistant</h2>
          <p>Please sign in to access history and AI features.</p>
        </div>
      </SignedOut>
    </div>
  );
}

export default App;