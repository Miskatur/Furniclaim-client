import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Loader from '../../components/Loader/Loader';

const PrivateRoutes = ({ children }) => {
    const { loading, user } = useContext(AuthContext)
    const location = useLocation()
    console.log(user, children);
    // console.log('Hello');

    if (loading) {
        return <Loader></Loader>
    }

    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;