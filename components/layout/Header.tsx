
import React from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { ViewType, appSectionsMap } from '../../app.config.ts';
// FIX: Add .tsx extension to file path to resolve module error.
import { Bell, Users } from '../icons/Icons.tsx';

interface HeaderProps {
  activeView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ activeView }) => {
  const activeSection = appSectionsMap[activeView];
  const title = activeSection ? activeSection.label : 'لوحة التحكم';

  return (
    <header className="h-20 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-500 hover:text-gray-800">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <Users className="w-5 h-5" />
            </div>
            <div>
                <p className="font-semibold text-sm text-gray-800">مدير النظام</p>
                <p className="text-xs text-gray-500">مسؤول</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;