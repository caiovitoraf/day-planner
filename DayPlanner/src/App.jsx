import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Workbench from './components/layout/Workbench';

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

  const [currentDate, setCurrentDate] = useState(getTodayDateString());

  useEffect(() => {
    localStorage.setItem('workbench-applets', JSON.stringify(applets));
  }, [applets]);

  const handleAddApplet = (type) => {
    let defaultTitle = 'Novo Applet';
    if (type === 'notes') defaultTitle = 'Notas Rápidas';
    if (type === 'todo') defaultTitle = 'Lista de Tarefas';
    if (type === 'appointments') defaultTitle = 'Agendamentos';

    const newApplet = {
      i: String(Date.now()),
      type: type,
      title: defaultTitle, // <-- NOVA PROPRIEDADE
      content: (type === 'todo' || type === 'appointments') ? [] : '',
      x: (applets.length * 4) % 12,
      y: Infinity,
      w: 4,
      h: 2,
    };
    setApplets([...applets, newApplet]);
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
    </>
  );
}

export default App;
