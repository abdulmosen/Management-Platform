
import React from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { UserRole } from '../../types.ts';

interface RolePillProps {
  role: UserRole;
}

const RolePill: React.FC<RolePillProps> = ({ role }) => {
  const getRoleColor = () => {
    switch (role) {
      case UserRole.Admin:
        return 'bg-[var(--status-purple-bg)] text-[var(--status-purple-text)]';
      case UserRole.Manager:
        return 'bg-[var(--status-blue-bg)] text-[var(--status-blue-text)]';
      case UserRole.Employee:
        return 'bg-[var(--status-gray-bg)] text-[var(--status-gray-text)]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${getRoleColor()}`}
    >
      {role}
    </span>
  );
};

export default RolePill;