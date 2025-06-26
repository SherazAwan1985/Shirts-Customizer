// components/Input.js
import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  className = '',
  divClassName = '',
  ...rest
}) => {
  return (
    <div className={`mb-4 ${divClassName}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...rest}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
