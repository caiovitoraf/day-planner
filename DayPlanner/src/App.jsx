import React, { useState, useEffect } from 'react'; // CORREÇÃO: useEffect foi adicionado aqui
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
      if (savedApplets) {
        return JSON.parse(savedApplets);
      }
    } catch (error) {
      console.error("Failed to parse applets from localStorage", error);
    }
    return [];
  });

  const [currentDate, setCurrentDate] = useState(getTodayDateString());

  useEffect(() => {
    localStorage.setItem('workbench-applets', JSON.stringify(applets));
  }, [applets]); 

  const handleAddApplet = (type) => {
    const defaultWidth = 4;
    const defaultHeight = 2;
    const nextX = (applets.length * defaultWidth) % 12;

    const newApplet = {
      i: String(Date.now()),
      type: type,
      x: nextX,
      y: 1000, 
      w: defaultWidth,
      h: defaultHeight,
      content: ''
    };
    setApplets([...applets, newApplet]);
  };

  const updateAppletContent = (appletId, newContent) => {
    const updatedApplets = applets.map(applet => {
      if (applet.i === appletId) {
        return { ...applet, content: newContent };
      }
      return applet;
    });
    setApplets(updatedApplets);
  };

  const onLayoutChange = (newLayout) => {
    const updatedApplets = applets.map(applet => {
      const layoutItem = newLayout.find(item => item.i === applet.i);
      return { ...applet, ...layoutItem };
    });
    setApplets(updatedApplets);
  };

  const handleClearWorkbench = () => {
    const clearedApplets = applets.map(applet => ({
      ...applet,
      content: '' 
    }));
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
