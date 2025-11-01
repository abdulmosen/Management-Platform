
import React from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { ViewType, mainNavSections, footerNavSections } from '../../app.config.ts';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  
  const NavButton: React.FC<{ item: typeof mainNavSections[number] | typeof footerNavSections[number] }> = ({ item }) => {
    const IconComponent = item.icon;
    const isActive = activeView === item.id;
    return (
      <button
        onClick={() => setActiveView(item.id as ViewType)}
        className={`w-full flex items-center py-3 px-3 rounded-lg transition-colors duration-200 relative ${
          isActive
            ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        {isActive && <span className="absolute right-0 top-2 bottom-2 w-1 bg-[var(--color-primary)] rounded-l-full"></span>}
        <IconComponent className="w-6 h-6" />
        <span className="hidden md:block me-auto mr-4">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-20 md:w-64 bg-[var(--color-surface)] text-gray-800 flex flex-col border-l border-[var(--color-border)]">
      <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-[var(--color-border)]">
        <svg className="w-8 h-8 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        <h1 className="hidden md:block text-xl font-bold ml-3">منصتي</h1>
      </div>
      <nav className="flex-1 py-6 px-3 md:px-4 space-y-2">
        {mainNavSections.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>
      <div className="py-6 px-3 md:px-4 border-t border-[var(--color-border)]">
         {footerNavSections.map((item) => (
            <NavButton key={item.id} item={item} />
         ))}
      </div>
    </aside>
  );
};

export default Sidebar;