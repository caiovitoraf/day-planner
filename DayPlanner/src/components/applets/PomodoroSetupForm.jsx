import React, { useState } from 'react';

// Predefinições
const presets = [
  { name: 'Clássico', workTime: 25, breakTime: 5 },
  { name: 'Foco Longo', workTime: 50, breakTime: 10 },
  { name: 'Sprint Rápido', workTime: 15, breakTime: 3 },
];

function PomodoroSetupForm({ onSave }) {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const handlePresetClick = (preset) => {
    setWorkTime(preset.workTime);
    setBreakTime(preset.breakTime);
  };

  const handleSave = () => {
    onSave({ workTime, breakTime });
  };

  return (
    <div className="pomodoro-setup">
      <h4>Predefinições Recomendadas:</h4>
      <div className="presets-container">
        {presets.map(p => (
          <button key={p.name} onClick={() => handlePresetClick(p)}>{p.name}</button>
        ))}
      </div>
      
      <h4 style={{marginTop: '1.5rem'}}>Personalizar:</h4>
      <div className="custom-inputs">
        <div className="form-group">
          <label>Tempo de Foco (min):</label>
          <input 
            type="number" 
            value={workTime} 
            onChange={e => setWorkTime(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Tempo de Descanso (min):</label>
          <input 
            type="number" 
            value={breakTime}
            onChange={e => setBreakTime(Number(e.target.value))}
            min="1"
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="button-primary" onClick={handleSave}>Adicionar à Workbench</button>
      </div>
    </div>
  );
}

export default PomodoroSetupForm;