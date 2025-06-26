// components/Breadcrumb.js
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
  return (
    <nav aria-label="breadcrumb" className='pt-4 pb-2 text-gray-600'>
      <ol className='flex gap-2 items-center text-xs'>
        {paths.map((item, index) => (
          <li key={index}>
            {index < paths.length - 1 ? (
              <>
                <Link to={item.href} className='text-xs'>{item.label}</Link>
                <span> / </span>
              </>
            ) : (
              <span className='text-xs'>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
