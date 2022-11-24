import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <BounceLoader color="#0C7EB0"></BounceLoader>
        </div>
    );
};

export default Loader;