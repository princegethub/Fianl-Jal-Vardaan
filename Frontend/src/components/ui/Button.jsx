// src/components/ui/Button.jsx
import React from 'react';
import { cva } from 'class-variance-authority';

const button = cva('px-4 py-2 rounded text-white', {
  variants: {
    intent: {
      primary: 'bg-blue-500 hover:bg-blue-600',
      secondary: 'bg-gray-500 hover:bg-gray-600',
    },
  },
});

const Button = ({ children, intent = 'primary', className, ...props }) => {
  return (
    <button className={button({ intent, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
