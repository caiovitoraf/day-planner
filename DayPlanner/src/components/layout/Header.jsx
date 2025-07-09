import React, { useState } from 'react'; // Importe o useState aqui também
import './Header.css';

function Header({ onAddApplet }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectApplet = (type) => {
    console.log('Sinal enviado do Menu! Tipo:', type); 
    onAddApplet(type); 
    setIsMenuOpen(false); 
  };

  return (
    <header className="header-container">
      <div className="header-date">
        <p>Date: __/__/____</p>
      </div>

      <div className="header-actions">
        <button className="action-button menu-button" title="Menu">
          ...
        </button>

        <div className="add-applet-container"> {/* Container para posicionar o menu */}
          <button 
            className="action-button add-button" 
            title="Adicionar Applet"
            // 2. O botão + agora apenas abre/fecha o menu
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          >
            +
          </button>
          
          {/* 3. O menu só aparece se isMenuOpen for true */}
          {isMenuOpen && (
            <div className="applet-menu">
              <button onClick={() => handleSelectApplet('notes')}>Notes</button>
              <button onClick={() => handleSelectApplet('todo')}>To-do List</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header