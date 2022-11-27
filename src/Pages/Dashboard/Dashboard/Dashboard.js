import { Player } from '@lottiefiles/react-lottie-player';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='mt-12'>
            <h1 className='text-3xl text-center font-bold my-5 text-secondary'>Welcome To FurniClaim Dashboard</h1>
            <h3 className='text-xl text-secondary font-semibold text-center'>Dear, {user?.displayName} <br />
                with the email : {user?.email}</h3>
            <p className='text-center text-secondary'>Tap On the sidebar to Check Your relevant Information. </p>

            <div >
                <Player
                    src='https://assets7.lottiefiles.com/private_files/lf30_kd4lxsxa.json'
                    className="player"
                    loop
                    autoplay
                />

            </div>
        </div>
    );
};

export default Dashboard;