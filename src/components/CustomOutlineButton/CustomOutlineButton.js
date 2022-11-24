import React from 'react';

const CustomOutlineButton = ({ children }) => {
    return (
        <button className='btn btn-outline btn-primary text-white font-bold'>
            {children}
        </button>
    );
};

export default CustomOutlineButton;