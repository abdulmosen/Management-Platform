
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
// FIX: Add .ts extension to file path to resolve module error.
import { ViewType, appSectionsMap } from './app.config.ts';
import PushNotification from './components/ui/PushNotification';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [showNotification, setShowNotification] = useState(true);

  const ActiveComponent = appSectionsMap[activeView]?.component;

  return (
    <div className="h-screen flex bg-[var(--color-background)] font-sans" dir="rtl">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--color-background)] p-8">
          {ActiveComponent ? <ActiveComponent setActiveView={setActiveView} /> : <div>Page not found</div>}
        </main>
      </div>
       {showNotification && (
        <PushNotification
          title="أهلاً بك في منصتي!"
          message="هذه هي لوحة التحكم الخاصة بك لإدارة جميع جوانب عملك."
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default App;