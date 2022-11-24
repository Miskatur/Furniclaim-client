import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth'
import app from '../firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)

    const authInfo = {
        loading,
        setLoading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;