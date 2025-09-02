import React, { useState, useEffect, useRef } from 'react';
import { IconX, IconPlus } from '@tabler/icons-react';
import Modal from '../common/Modal';
import './AppointmentsApplet.css';

function AppointmentForm({ onSave, onCancel, appointment = { time: '09:00', activity: '' } }) {
  const [time, setTime] = useState(appointment.time);
  const [activity, setActivity] = useState(appointment.activity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.trim()) {
      onSave({ time, activity });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="appt-time">Horário:</label>
        <input 
          id="appt-time"
          type="time" 
          value={time} 
          onChange={e => setTime(e.target.value)}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="appt-activity">Atividade:</label>
        <input 
          id="appt-activity"
          type="text"
          placeholder="Descrição do agendamento..."
          value={activity}
          onChange={e => setActivity(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="form-actions">
        <button type="button" className="button-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="button-primary">Salvar</button>
      </div>
    </form>
  );
}


function AppointmentsApplet({ id, content, onContentChange }) {
  const appointments = content || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempEdit, setTempEdit] = useState({ time: '', activity: '' });
  
  // A variável de referência é declarada aqui
  const editInputRef = useRef(null);

  // Este useEffect foca no input quando a edição começa
  useEffect(() => {
    if (editingId !== null) {
      // Usando a variável com o nome 100% correto
      editInputRef.current?.focus();
    }
  }, [editingId]);

  const handleSaveAppointment = (newAppointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...newAppointmentData
    };
    onContentChange(id, [...appointments, newAppointment]);
    setIsModalOpen(false);
  };
  
  const handleDeleteAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(appt => appt.id !== appointmentId);
    onContentChange(id, updatedAppointments);
  };
  
  const handleStartEdit = (appointment) => {
    setEditingId(appointment.id);
    setTempEdit({ time: appointment.time, activity: appointment.activity });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTempEdit(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveEdit = (appointmentId) => {
    if (!tempEdit.activity.trim()) {
      handleDeleteAppointment(appointmentId);
      setEditingId(null);
      return;
    }
    const updatedAppointments = appointments.map(appt => 
      appt.id === appointmentId ? { ...appt, time: tempEdit.time, activity: tempEdit.activity } : appt
    );
    onContentChange(id, updatedAppointments);
    setEditingId(null);
  };

  const handleEditKeyDown = (e, appointmentId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(appointmentId);
    }
    if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="appointments-container">
      <div className="appointments-list">
        {sortedAppointments.length === 0 ? (
          <p className="empty-message">Nenhum agendamento para hoje.</p>
        ) : (
          sortedAppointments.map(appt => (
            <div key={appt.id} className="appointment-item" onClick={() => editingId !== appt.id && handleStartEdit(appt)}>
              
              {editingId === appt.id ? (
                <>
                  <input
                    type="time"
                    name="time"
                    value={tempEdit.time}
                    className="time-edit-input"
                    onChange={handleEditChange}
                    onBlur={() => handleSaveEdit(appt.id)}
                    onKeyDown={(e) => handleEditKeyDown(e, appt.id)}
                  />
                  
                  <input 
                    ref={editInputRef}
                    type="text"
                    name="activity"
                    value={tempEdit.activity}
                    className="activity-edit-input"
                    onChange={handleEditChange}
                    onBlur={() => handleSaveEdit(appt.id)}
                    onKeyDown={(e) => handleEditKeyDown(e, appt.id)}
                  />
                </>
              ) : (
                <>
                  <span className="appointment-time">{appt.time}</span>
                  <span className="appointment-activity">{appt.activity}</span>
                </>
              )}

              <button className="delete-appointment-button" onClick={(e) => { e.stopPropagation(); handleDeleteAppointment(appt.id); }}>
                <IconX size={16} />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="add-appointment-area">
        <button className="add-appointment-button" onClick={() => setIsModalOpen(true)}><IconPlus /></button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Agendamento">
        <AppointmentForm 
          onSave={handleSaveAppointment}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default AppointmentsApplet;