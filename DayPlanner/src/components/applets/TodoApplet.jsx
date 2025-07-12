import React, { useState } from 'react';
import './TodoApplet.css';

function TodoApplet({ id, tasks, onContentChange }) {
  
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return; 

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    onContentChange(id, [...tasks, newTask]);
    setNewTaskText(''); // Limpa o campo de input
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onContentChange(id, updatedTasks);
  };

  return (
    <div className="applet-card todo-applet">
      <div className="applet-header">
        <h3>To-do List</h3>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input 
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Adicionar nova tarefa..."
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default TodoApplet;