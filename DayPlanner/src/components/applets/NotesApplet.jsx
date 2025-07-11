import React from 'react';
import './NotesApplet.css';

function NotesApplet({ id, content, onContentChange }) {
  return (
    <div className="applet-card">
      <div className="applet-header">
        <h3>Notes</h3>
      </div>
      <div className="applet-content">
        <textarea
          className="notes-textarea"
          value={content} 
          onChange={(e) => {
            onContentChange(id, e.target.value);
          }}
          placeholder="Comece a digitar..."
        />
      </div>
    </div>
  );
}

export default NotesApplet;