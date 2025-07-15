import React from 'react';
import './NotesApplet.css';

function NotesApplet({ id, content, onContentChange }) {
  return (
    <textarea
      className="notes-textarea"
      placeholder="Comece a digitar..."
      value={content}
      onChange={(e) => onContentChange(id, e.target.value)}
    />
  );
}

export default NotesApplet;