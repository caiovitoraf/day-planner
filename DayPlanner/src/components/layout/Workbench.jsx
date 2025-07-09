import './Workbench.css';
import NotesApplet from '../applets/NotesApplet';
import TodoApplet from '../applets/TodoApplet';

function Workbench({ applets }) {
    
    console.log('Workbench sendo renderizada com esta lista:', applets);

    const renderAppletComponent = (applet) => {
    switch (applet.type) {
      case 'notes':
        return <NotesApplet />;
      case 'todo':
        return <TodoApplet />;
      default:
        return null; 
    }
  };

 return (
    <main className="workbench-container">
      {applets.map(applet => (
        <div 
          key={applet.id} 
          className="applet-wrapper"
          style={{
            gridColumn: `${applet.x} / span ${applet.w}`,
            gridRow: `${applet.y} / span ${applet.h}`,
          }}
        >
          {renderAppletComponent(applet)}
        </div>
      ))}
    </main>
  );
}

export default Workbench;