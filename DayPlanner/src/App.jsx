import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Workbench from './components/layout/Workbench';
import Modal from './components/common/Modal';
import PomodoroSetupForm from './components/applets/PomodoroSetupForm';


const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function App() {
  const [applets, setApplets] = useState(() => {
    try {
      const savedApplets = localStorage.getItem('workbench-applets');
      return savedApplets ? JSON.parse(savedApplets) : [];
    } catch (error) {
      console.error("Erro ao carregar applets do localStorage", error);
      return [];
    }
  });

  const [setupInfo, setSetupInfo] = useState({ isOpen: false, type: null });

  const [currentDate, setCurrentDate] = useState(getTodayDateString());

  const [theme, setTheme] = useState(() => {
    // Lê o tema salvo no localStorage ou usa 'light' como padrão
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('workbench-applets', JSON.stringify(applets));
  }, [applets]);

  useEffect(() => {
    // Salva a escolha do tema no localStorage
    localStorage.setItem('theme', theme);
    // Adiciona o atributo data-theme ao body para o CSS funcionar
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleAddApplet = (type, config = {}) => {
    let defaultTitle = 'Novo Applet';
    let content = type === 'todo' || type === 'appointments' ? [] : '';
    let { w, h } = { w: 4, h: 4 }; 
    if (type === 'notes') defaultTitle = 'Notas Rápidas';
    if (type === 'todo') defaultTitle = 'Lista de Tarefas';
    if (type === 'appointments') defaultTitle = 'Agendamentos';
    
    if (type === 'pomodoro') {
      defaultTitle = 'Timer Pomodoro';
      content = {
        workTime: config.workTime || 25, 
        breakTime: config.breakTime || 5,  
      };
      w = 3; 
    }

    const newApplet = {
      i: String(Date.now()),
      type: type,
      title: defaultTitle,
      content: content,
      x: (applets.length * 4) % 12,
      y: Infinity,
      w: w,
      h: h,
    };
    setApplets(prevApplets => [...prevApplets, newApplet]);
    setSetupInfo({ isOpen: false, type: null }); // Fecha o modal após adicionar
  };

  const handleOpenSetup = (type) => {
    setSetupInfo({ isOpen: true, type: type });
  };
  
  const handleCloseSetup = () => {
    setSetupInfo({ isOpen: false, type: null });
  };
  

  // FUNÇÃO DE ATUALIZAÇÃO GENÉRICA (MAIS PODEROSA)
  const handleUpdateApplet = (appletId, updatedProperties) => {
    setApplets(applets.map(applet => 
      applet.i === appletId ? { ...applet, ...updatedProperties } : applet
    ));
  };

  // NOVA FUNÇÃO PARA APAGAR
  const handleDeleteApplet = (appletId) => {
    setApplets(applets.filter(applet => applet.i !== appletId));
  };

  // NOVA FUNÇÃO PARA LIMPAR CONTEÚDO
  const handleClearApplet = (appletId) => {
    const appletToClear = applets.find(applet => applet.i === appletId);
    if (!appletToClear) return;

    const initialContent = (appletToClear.type === 'todo' || appletToClear.type === 'appointments') ? [] : '';
    handleUpdateApplet(appletId, { content: initialContent });
  };

  const onLayoutChange = (newLayout) => {
    setApplets(currentApplets => 
      currentApplets.map(applet => {
        const layoutItem = newLayout.find(item => item.i === applet.i);
        return layoutItem ? { ...applet, ...layoutItem } : applet;
      })
    );
  };

  const handleClearWorkbench = () => {
    const clearedApplets = applets.map(applet => {
      const clearedContent = applet.type === 'todo' ? [] : '';
      return {
        ...applet,
        content: clearedContent,
      };
    });
    setApplets(clearedApplets);
  };

  const handleClearAll = () => {
    setApplets([]);
  };



  return (
    <>
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onAddApplet={handleAddApplet}
        theme={theme}
        setTheme={setTheme}
        onOpenSetup={handleOpenSetup}
        onClearWorkbench={handleClearWorkbench}
        onClearAll={handleClearAll}
      />
      <Workbench
        applets={applets}
        onLayoutChange={onLayoutChange}
        onUpdateApplet={handleUpdateApplet}
        onDeleteApplet={handleDeleteApplet}
        onClearApplet={handleClearApplet}
      />
      <Modal 
        isOpen={setupInfo.isOpen && setupInfo.type === 'pomodoro'} 
        onClose={handleCloseSetup}
        title="Configurar Timer Pomodoro"
      >
        <PomodoroSetupForm 
          onSave={config => handleAddApplet('pomodoro', config)} 
        />
      </Modal>
    </>
  );
}

export default App;
