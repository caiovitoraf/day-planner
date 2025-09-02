import React, { useState, useRef, useEffect } from 'react';
import { IconPencil, IconMenu2 } from '@tabler/icons-react';
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
          <IconPencil size={22} />
        </button>                  

        <div className="applet-menu-container no-drag" ref={menuRef}>
          <button 
            className="icon-button applet-menu-button"
            title="Opções do applet"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IconMenu2 size={22} />
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