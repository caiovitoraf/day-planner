import React from 'react';
import GridLayout from 'react-grid-layout';
import './Workbench.css'; 
import NotesApplet from '../applets/NotesApplet';
import TodoApplet from '../applets/TodoApplet';
import AppletCard from '../common/AppletCard';
import AppointmentsApplet from '../applets/AppointmentsApplet';


function Workbench({ applets, onLayoutChange, onUpdateApplet, onDeleteApplet, onClearApplet }) {

  const renderAppletContent = (applet) => {
    // Passamos apenas as props que o applet específico precisa
    const contentProps = {
      id: applet.i,
      content: applet.content,
      onContentChange: (id, newContent) => onUpdateApplet(id, { content: newContent })
    };

    switch (applet.type) {
      case 'notes':
        return <NotesApplet {...contentProps} />;
      case 'todo':
        return <TodoApplet id={contentProps.id} tasks={contentProps.content} onContentChange={contentProps.onContentChange} />;
      case 'appointments':
        return <AppointmentsApplet {...contentProps} />;
      default:
        return <div>Tipo de Applet desconhecido</div>; 
    }
  };

 return (
    <GridLayout
      className="layout"
      layout={applets} 
      onLayoutChange={onLayoutChange} 
      cols={12}
      rowHeight={60}
      width={1600} 
      compactType="vertical"
      preventCollision={true}
      isDraggable={true}
      isResizable={true}
      draggableHandle=".applet-header"
      draggableCancel=".no-drag"
    >
      {applets.map(applet => (
        <div key={applet.i} data-grid={{x: applet.x, y: applet.y, w: applet.w, h: applet.h}}>
            <AppletCard 
                applet={applet}
                onUpdate={onUpdateApplet}
                onDelete={onDeleteApplet}
                onClear={onClearApplet}
            >
              {renderAppletContent(applet)}
            </AppletCard>
        </div>
      ))}
    </GridLayout>
  );
}

export default Workbench;