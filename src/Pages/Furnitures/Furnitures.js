import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Product from './Product/Product';

const Furnitures = () => {
    const category = useLoaderData()
    const navigation = useNavigation()
    const { name } = category;

    const url = `http://localhost:5000/products/${name}`

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["name"],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })


    if (navigation.state === 'loading' || isLoading) {
        return <Loader></Loader>
    }



    return (
        <div className='lg:px-20 py-20'>
            <h1 className='text-2xl font-semibold text-secondary text-center'>You are showing the  <span className='font-bold'>{name}</span> category.</h1>
            <div className='grid lg:grid-cols-3 gap-5 my-10'>
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

export default Furnitures;  