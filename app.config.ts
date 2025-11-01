
import React from 'react';
// FIX: Add .tsx extensions to file paths to resolve module errors.
import DashboardOverview from './components/sections/DashboardOverview.tsx';
import Licenses from './components/sections/Licenses.tsx';
import Employees from './components/sections/Employees.tsx';
import Fines from './components/sections/Fines.tsx';
import Financials from './components/sections/Financials.tsx';
import Settings from './components/sections/Settings.tsx';
import Users from './components/sections/Users.tsx';
import { Dashboard, FileText, Users as UsersIcon, AlertTriangle, CreditCard, SettingsIcon, LogOut } from './components/icons/Icons.tsx';

export type ViewType = 'dashboard' | 'licenses' | 'employees' | 'fines' | 'financials' | 'users' | 'settings' | 'logout';

interface AppSection {
  id: ViewType;
  label: string;
  icon: React.FC<{ className?: string }>;
  component?: React.FC<{ setActiveView?: (view: ViewType) => void }>;
}

export const appSectionsMap: Record<ViewType, AppSection> = {
  dashboard: { id: 'dashboard', label: 'لوحة التحكم', icon: Dashboard, component: DashboardOverview },
  licenses: { id: 'licenses', label: 'التراخيص', icon: FileText, component: Licenses },
  employees: { id: 'employees', label: 'الموظفين', icon: UsersIcon, component: Employees },
  fines: { id: 'fines', label: 'الغرامات', icon: AlertTriangle, component: Fines },
  financials: { id: 'financials', label: 'المالية', icon: CreditCard, component: Financials },
  users: { id: 'users', label: 'المستخدمين', icon: UsersIcon, component: Users },
  settings: { id: 'settings', label: 'الإعدادات', icon: SettingsIcon, component: Settings },
  logout: { id: 'logout', label: 'تسجيل الخروج', icon: LogOut, component: () => React.createElement('div', null, 'Logging out...') },
};

export const mainNavSections: AppSection[] = [
  appSectionsMap.dashboard,
  appSectionsMap.licenses,
  appSectionsMap.employees,
  appSectionsMap.fines,
  appSectionsMap.financials,
  appSectionsMap.users,
];

export const footerNavSections: AppSection[] = [
    appSectionsMap.settings,
    appSectionsMap.logout,
];
