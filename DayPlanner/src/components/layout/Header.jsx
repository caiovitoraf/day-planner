import React, { useState } from 'react';
import { IconMenu2, IconLayoutGridAdd } from '@tabler/icons-react';
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
            <IconMenu2 size={22} />
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
            <IconLayoutGridAdd size={24} />
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