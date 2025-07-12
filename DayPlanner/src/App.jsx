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
      console.error("Failed to parse applets from localStorage", error);
      return [];
    }
  });

  const [currentDate, setCurrentDate] = useState(getTodayDateString());

  useEffect(() => {
    localStorage.setItem('workbench-applets', JSON.stringify(applets));
  }, [applets]);

  const handleAddApplet = (type) => {
    const defaultWidth = 4;
    const defaultHeight = 3;
    const nextX = (applets.length * defaultWidth) % 12;

    const newApplet = {
      i: String(Date.now()),
      type: type,
      x: nextX,
      y: 1000,
      w: defaultWidth,
      h: defaultHeight,
      content: type === 'todo' ? [] : '',
    };
    setApplets([...applets, newApplet]);
  };

  const updateAppletContent = (appletId, newContent) => {
    const updatedApplets = applets.map(applet =>
      applet.i === appletId ? { ...applet, content: newContent } : applet
    );
    setApplets(updatedApplets);
  };

  const onLayoutChange = (newLayout) => {
    const updatedApplets = applets.map(applet => {
      const layoutItem = newLayout.find(item => item.i === applet.i);
      return { ...applet, ...layoutItem };
    });
    setApplets(updatedApplets);
  };

  // --- ESTA É A VERSÃO CORRIGIDA DA FUNÇÃO ---
  const handleClearWorkbench = () => {
    const clearedApplets = applets.map(applet => {
      // Verifica o tipo do applet e define o conteúdo "vazio" apropriado
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
        onUpdateAppletContent={updateAppletContent}
      />
    </>
  );
}

export default App;
