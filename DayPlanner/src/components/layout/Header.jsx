import React, { useState } from 'react';
import './Header.css';

function Header({ currentDate, setCurrentDate, onAddApplet, onClearWorkbench, onClearAll, theme, setTheme, onOpenSetup }) {
  const [isAppletMenuOpen, setIsAppletMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const handleSelectApplet = (type) => {
    // Lista de applets que precisam de configuração antes de serem adicionados
    const appletsThatNeedSetup = ['pomodoro'];

    if (appletsThatNeedSetup.includes(type)) {
      // Se o applet precisa de configuração, chamamos a função para abrir o modal
      onOpenSetup(type);
    } else {
      // Caso contrário, chamamos a função para adicionar diretamente
      onAddApplet(type);
    }

    setIsAppletMenuOpen(false); 

  };
  
  const formatDateForDisplay = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

   return (
    <header className="header-container">
      <div className="header-date">
        {isEditingDate ? (
        <input 
            type="date"
            className="date-input"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            onBlur={() => setIsEditingDate(false)}
            autoFocus
          />
        ) : (
          <p onClick={() => setIsEditingDate(true)} title="Clique para alterar a data">
            Date: {formatDateForDisplay(currentDate)}
          </p>
        )}
      </div>

      <div className="header-actions">
        <div className="settings-menu-container">
          <button 
            className="action-button menu-button" 
            title="Menu"
            onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 -4 24 24" 
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
          </button>
          {isSettingsMenuOpen && (
            <div className="settings-menu">
              <button onClick={() => { onClearWorkbench(); setIsSettingsMenuOpen(false); }}>Limpar Workbench</button>
              <button onClick={() => { onClearAll(); setIsSettingsMenuOpen(false); }}>Limpar Applets</button>
              
              <button onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
                setIsSettingsMenuOpen(false);
              }}>
                {theme === 'light' ? 'Mudar para Modo Escuro' : 'Mudar para Modo Claro'}
              </button>
            </div>
          )}
        </div>

        <div className="add-applet-container">
          <button 
            className="action-button add-button" 
            title="Adicionar Applet"
            onClick={() => setIsAppletMenuOpen(!isAppletMenuOpen)} 
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 4h6v6h-6zm10 0h6v6h-6zm-10 10h6v6h-6zm10 3h6m-3 -3v6" />
          </svg>
          </button>
          
          {isAppletMenuOpen && (
            <div className="applet-menu">
              <button onClick={() => handleSelectApplet('notes')}>Notes</button>
              <button onClick={() => handleSelectApplet('todo')}>To-do List</button>
              <button onClick={() => handleSelectApplet('appointments')}>Agendamentos</button>
              <button onClick={() => handleSelectApplet('pomodoro')}>Pomodoro</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;