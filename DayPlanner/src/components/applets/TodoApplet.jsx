import React from 'react';
import './NotesApplet.css';

function TodoApplet() {
  return (
    <div className="applet-card">
      <div className="applet-header">
        <h3>To-do List</h3>
      </div>
      <div className="applet-content">
        <p>Sua lista de tarefas aparecerá aqui...</p>
      </div>
    </div>
  );
}

export default TodoApplet;