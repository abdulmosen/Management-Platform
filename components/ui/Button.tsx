
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-[var(--color-primary)] text-white font-semibold py-2 px-5 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all duration-150 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;