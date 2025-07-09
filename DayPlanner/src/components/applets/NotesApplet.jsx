import React from 'react';
import './NotesApplet.css';

function NotesApplet() {
  return (
    <div className="applet-card">
      <div className="applet-header">
        <h3>Notes</h3>
      </div>
      <div className="applet-content">
        <p>Sua primeira anotação aparecerá aqui...</p>
      </div>
    </div>
  );
}

export default NotesApplet;