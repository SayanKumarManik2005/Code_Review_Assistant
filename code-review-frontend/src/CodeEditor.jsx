import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode }) => {
  return (
    // We removed the outer <div> wrapper here because 
    // the "pane" div in App.jsx now handles the layout.
    <div className="editor-wrapper">
      <div className="panel-title">📝 INPUT CODE</div>
      <Editor
        height="100%" 
        defaultLanguage="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",         // Fixes horizontal scrolling issues
          automaticLayout: true,  // Crucial: Updates size when you drag the handle
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;