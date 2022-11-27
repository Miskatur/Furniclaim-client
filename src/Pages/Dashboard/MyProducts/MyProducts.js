import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loader from '../../../components/Loader/Loader';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const url = `http://localhost:5000/products/${user?.email}`
    const { data: products = [], isLoading } = useQuery({
        queryKey: [`${user?.email}`],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        },
    })
    console.log(products.length);
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <p>My Products Page!</p>
        </div>
    );
};

export default MyProducts;  