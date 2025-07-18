import React from 'react';
import './AppointmentsApplet.css';

function AppointmentsApplet({ id, content, onContentChange }) {
  const appointments = content || [];

  return (
    <div className="appointments-container">
      <div className="appointments-list">
        {appointments.length === 0 ? (
          <p className="empty-message">Nenhum agendamento para hoje.</p>
        ) : (
          appointments.map(appt => (
            <div key={appt.id} className="appointment-item">
              <span className="appointment-time">{appt.time}</span>
              <span className="appointment-activity">{appt.activity}</span>
            </div>
          ))
        )}
      </div>
      <div className="add-appointment-area">
        <button className="add-appointment-button">+</button>
      </div>
    </div>
  );
}

export default AppointmentsApplet;