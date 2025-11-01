
import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  value: string;
  children: ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, icon, value, children, onClick }) => {
  const isClickable = !!onClick;
  const Tag = isClickable ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      className={`bg-[var(--color-surface)] rounded-xl shadow-sm p-6 flex flex-col justify-between text-right w-full card-transition ${isClickable ? 'cursor-pointer hover:shadow-md hover:-translate-y-1' : ''}`}
    >
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-600">{title}</h3>
          {icon}
        </div>
        <p className="text-4xl font-bold my-2 text-gray-800">{value}</p>
      </div>
      <div>{children}</div>
    </Tag>
  );
};

export default Card;