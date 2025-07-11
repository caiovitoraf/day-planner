import React, { useState } from 'react'; 
import Header from './components/layout/Header';
import Workbench from './components/layout/Workbench';

function App() {

  const [applets, setApplets] = useState([]);
  
  const handleAddApplet = (type) => {
    const defaultWidth = 4;
    const defaultHeight = 2;
    const nextX = applets.reduce((acc, applet) => acc + applet.w, 0) % 12;

    const newApplet = {
      i: String(Date.now()), 
      type: type,
      x: nextX,
      y: Infinity, 
      w: defaultWidth,
      h: defaultHeight,
    };
    setApplets([...applets, newApplet]);
  };

  const onLayoutChange = (newLayout) => {
    const updatedApplets = applets.map(applet => {
      const layoutItem = newLayout.find(item => item.i === applet.i);
      return { ...applet, ...layoutItem };
    });
    setApplets(updatedApplets);
  };

  return (
    <>
      <Header onAddApplet={handleAddApplet} />
      <Workbench applets={applets} onLayoutChange={onLayoutChange} />
    </>
  )
}

export default App