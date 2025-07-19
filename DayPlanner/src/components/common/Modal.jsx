import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    // O overlay é o fundo escurecido que fecha o modal ao ser clicado
    <div className="modal-overlay" onClick={onClose}>
      {/* Usamos e.stopPropagation() para evitar que o clique no modal feche o modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;