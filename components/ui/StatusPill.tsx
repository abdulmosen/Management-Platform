

import React from 'react';
// FIX: Add .ts extension to file path to resolve module error.
import { Status } from '../../types.ts';

interface StatusPillProps {
  status: Status;
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case Status.Active:
      case Status.OnTrack:
        return 'bg-[var(--status-green-bg)] text-[var(--status-green-text)]';
      case Status.Pending:
        return 'bg-[var(--status-blue-bg)] text-[var(--status-blue-text)]';
      case Status.ExpiresSoon:
        return 'bg-[var(--status-yellow-bg)] text-[var(--status-yellow-text)]';
      case Status.Expired:
      case Status.Unpaid:
      case Status.NeedsAction:
        return 'bg-[var(--status-red-bg)] text-[var(--status-red-text)]';
      case Status.Paid:
        return 'bg-[var(--status-gray-bg)] text-[var(--status-gray-text)]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusPill;