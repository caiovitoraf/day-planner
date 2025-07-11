import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './Workbench.css'; 
import NotesApplet from '../applets/NotesApplet';
import TodoApplet from '../applets/TodoApplet';

function Workbench({ applets, onLayoutChange, onUpdateAppletContent }) {

  const renderAppletComponent = (applet) => {
    switch (applet.type) {
      case 'notes':
        return <NotesApplet 
                 id={applet.i} 
                 content={applet.content}
                 onContentChange={onUpdateAppletContent} 
               />;
      case 'todo':
        return <TodoApplet />;
      default:
        return null; 
    }
  };

 return (
    <GridLayout
      className="layout"
      layout={applets} 
      onLayoutChange={onLayoutChange} 
      cols={12}
      rowHeight={120}
      width={1600} 
      compactType="vertical"
      preventCollision={true}
    >
      {applets.map(applet => (
        <div key={applet.i} className="applet-wrapper">
          {renderAppletComponent(applet)}
        </div>
      ))}
    </GridLayout>
  );
}

export default Workbench;