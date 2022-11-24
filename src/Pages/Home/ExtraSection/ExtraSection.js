import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';


const ExtraSection = () => {
    return (
        <div className='bg-accent py-20'>
            <div className='lg:px-20 grid lg:grid-cols-2 gap-y-5 '>
                <div>
                    <Player
                        src='https://assets1.lottiefiles.com/packages/lf20_svotowoc.json'
                        className="player"
                        loop
                        autoplay
                        style={{ height: '23em', width: '23em' }}
                    />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-secondary text-4xl font-bold '>We Believe in<br /> <span className='text-primary'> Recycle Concept</span>.</h1>
                    <div className='py-3'>
                        <h3 className=' lg:ml-20 text-black font-semibold text-2xl'>Sell What You Have,</h3>
                        <h3 className='lg:mr-20 text-black font-semibold text-2xl'>Buy What You Need!</h3>
                        <h3 className='lg:ml-20 text-black font-semibold text-2xl'>We Care Your Money.</h3>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;