import React, { useState, useRef, useEffect } from 'react';
import './AppletCard.css';

function AppletCard({ applet, onUpdate, onDelete, onClear, children }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(applet.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cardClassName = `applet-card-base`;

  const menuRef = useRef(null);
  const inputRef = useRef(null);

   useEffect(() => {
    setNewTitle(applet.title);
  }, [applet.title]);

  useEffect(() => {
    if (isEditingTitle) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);


  const handleTitleSave = () => {
    setIsEditingTitle(false);
    if (newTitle.trim() && newTitle !== applet.title) {
      onUpdate(applet.i, { title: newTitle });
    }
  };

  const handleEditClick = () => {
    setNewTitle(applet.title);
    setIsEditingTitle(true);
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
    if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setNewTitle(applet.title);
    }
  };

  return (
    <div className={cardClassName}>
      <div className="applet-header">
        {isEditingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            onBlur={handleTitleSave}
            className="title-input no-drag"
          />
        ) : (
          <h3 className="applet-title">{applet.title}</h3>
        )}

        <button 
          className="icon-button edit-title-button no-drag" 
          title="Editar título"
          onClick={isEditingTitle ? () => setIsEditingTitle(false) : handleEditClick}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
          <path d="M13.5 6.5l4 4" />
        </svg>
        </button>                  

        <div className="applet-menu-container no-drag" ref={menuRef}>
          <button 
            className="icon-button applet-menu-button"
            title="Opções do applet"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
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
          {isMenuOpen && (
            <div className="applet-dropdown-menu">
              <button onClick={() => { onClear(applet.i); setIsMenuOpen(false); }}>Limpar applet</button>
              <button onClick={() => { onDelete(applet.i); setIsMenuOpen(false); }}>Apagar applet</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="applet-content-area">
        {children}
      </div>
    </div>
  );
}

export default AppletCard;