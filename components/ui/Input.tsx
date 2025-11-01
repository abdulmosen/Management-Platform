
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        id={id}
        className={`bg-white border border-[var(--color-border)] text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] block w-full p-2.5 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;