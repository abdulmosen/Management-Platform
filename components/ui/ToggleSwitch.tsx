
import React from 'react';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-14 h-8 rounded-full transition ${checked ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow transition-transform ${checked ? 'transform translate-x-6' : ''}`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;