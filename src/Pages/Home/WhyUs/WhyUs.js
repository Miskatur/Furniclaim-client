import React from 'react';
import { FaCartPlus, FaCertificate, FaDollarSign } from 'react-icons/fa';

const WhyUs = () => {
    return (
        <div className='lg:px-40 my-32'>
            <h2 className='text-4xl text-center text-secondary font-bold my-20'>Why Us?</h2>
            <div className='grid lg:grid-cols-3 gap-5'>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl text-secondary">
                        <div className="card-body">
                            <div className="card-actions justify-center">
                                <FaCartPlus className='text-4xl'></FaCartPlus>
                            </div>
                            <p className='text-2xl font-bold'>Easy To Pick</p>
                            <p>You can Easily choose from our Seller's.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl text-secondary">
                        <div className="card-body">
                            <div className="card-actions justify-center">
                                <FaCertificate className='text-4xl' />
                            </div>
                            <p className='text-2xl font-bold'>Verified Seller</p>
                            <p>We provide 100% Verified Seller.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl text-secondary">
                        <div className="card-body">
                            <div className="card-actions justify-center">
                                <FaDollarSign className='text-4xl' />
                            </div>
                            <p className='text-2xl font-bold'>Easy To Purchase</p>
                            <p>You can Pay Online or Offline.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WhyUs;