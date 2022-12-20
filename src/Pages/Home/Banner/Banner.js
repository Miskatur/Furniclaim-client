import React from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';

const Banner = () => {
    return (
        <div className=' lg:px-20 my-20 '>
            <div className='grid lg:grid-cols-2 gap-5'>
                <div className='flex flex-col justify-center items-center order-last lg:order-first'>
                    <h2 className='text-2xl text-black font-semibold'>Are You Looking For <br /> <span className='text-4xl text-secondary font-bold'>Refurbish Furniture?</span></h2>
                    <p className='mb-5 text-black text-xl'>We got exactly what you need!</p>
                    <CustomButton>Find Out More</CustomButton>
                </div>
                <div>
                    <img src="https://i.ibb.co/pJyTWbd/modern-home-decor-with-green-sofa-rattan-furniture-green-wall-background-269031-15.jpg" alt="" />

                </div>
            </div>
        </div>
    );
};

export default Banner;