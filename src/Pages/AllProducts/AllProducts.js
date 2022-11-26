import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../components/Loader/Loader';
import Product from '../Furnitures/Product/Product';

const AllProducts = () => {

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            return data
        }
    })
    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='my-12 lg:px-20'>
            <h2 className='text-3xl font-bold text-secondary my-10'>Find Your Home Appliance With Furniclaim.</h2>

            <div className='grid lg:grid-cols-3 gap-x-5 gap-y-10 my-10'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default AllProducts;