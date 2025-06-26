// components/Input.js
import React from 'react';

const Textarea = ({
  label,
  name, 
  placeholder = '',
  value,
  onChange,
  error,
  className = '',
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name} 
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

export default Textarea;
