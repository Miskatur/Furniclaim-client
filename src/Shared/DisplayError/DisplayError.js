import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError()
    const { Logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogOut = () => {
        Logout()
            .then(() => {
                localStorage.removeItem('accessToken')
                toast.success("User Logged Out Successfully")
                navigate('/')
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='flex justify-center items-center h-96'>
            <p className='text-red-600 text-3xl text-center'>Opps! Something went wrong!</p>
            <p className='text-red-500 text-xl text-center'>{error.statusText || error.message}</p>
            <h2 className='text-2xl text-center'>Please <button className='btn btn-primary btn-md' onClick={handleLogOut}>Log Out</button> and Login Again.</h2>
        </div>
    );
};

export default DisplayError;