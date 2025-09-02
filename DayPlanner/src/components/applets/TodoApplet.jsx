import React, { useState } from 'react';
import { IconX, IconPlus } from '@tabler/icons-react';
import './TodoApplet.css';

// Recebe id, a lista de 'tasks' (que é o 'content' do applet) e a função onContentChange
function TodoApplet({ id, tasks, onContentChange }) {
  
  const [newTaskText, setNewTaskText] = useState('');

  // Adiciona uma nova tarefa
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    
    // Comunica a nova lista (com a tarefa adicionada) para o App.jsx
    onContentChange(id, [...tasks, newTask]);
    setNewTaskText('');
  };

  // Alterna o estado 'completed' de uma tarefa
  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    // Comunica a alteração para o App.jsx
    onContentChange(id, updatedTasks);
  };

  // Apaga uma tarefa específica
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    // Comunica a alteração para o App.jsx
    onContentChange(id, updatedTasks);
  };

  return (
    // Usamos um Fragment (<>) ou uma div simples, pois o .applet-card-base já está por fora
    <div className="todo-applet-container">
      <div className="todo-list">
        {tasks.map(task => (
          <div key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <span className="todo-text" onClick={() => handleToggleTask(task.id)}>
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} className="delete-task-button">
              <IconX size={16} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddTask} className="add-todo-form">
        <input
          type="text"
          className="add-todo-input"
          placeholder="Adicionar nova tarefa..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button type="submit" className="add-todo-button"><IconPlus /></button>
      </form>
    </div>
  );
}

export default TodoApplet;