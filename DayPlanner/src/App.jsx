import React, { useState } from 'react'; 
import Header from './components/layout/Header';
import Workbench from './components/layout/Workbench';

function App() {

  const [applets, setApplets] = useState([]);
  
  const handleAddApplet = (type) => {
    console.log('App.jsx recebeu o sinal para adicionar:', type); // Para testar o sinal


    const defaultWidth = 4;
    const defaultHeight = 2;
    const nextX = applets.reduce((acc, applet) => acc + applet.w, 0) % 12 + 1;

    const newApplet = {
      id: Date.now(), 
      type: type,
      x: nextX,
      y: 1, 
      w: defaultWidth,
      h: defaultHeight,
    };
    setApplets([...applets, newApplet]);
  };

  return (
    <>
      <Header onAddApplet={handleAddApplet} />
    <Workbench applets={applets} />
    </>
  )
}

export default App