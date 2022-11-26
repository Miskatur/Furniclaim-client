import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import BookingModals from '../../components/BookingModals/BookingModals';
import Loader from '../../components/Loader/Loader';
import Product from './Product/Product';

const Furnitures = () => {
    const category = useLoaderData()
    const navigation = useNavigation()
    const { name } = category;
    const [furniture, setFurniture] = useState(null)
    const { loading } = useContext(AuthContext)
    const url = `http://localhost:5000/products/${name}`

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["name"],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })


    if (navigation.state === 'loading' || isLoading || loading) {
        return <Loader></Loader>
    }



    return (
        <div className='px-5 lg:px-20 py-20'>
            <h1 className='text-2xl font-semibold text-secondary text-center'>You are showing the  <span className='font-bold'>{name}</span> category.</h1>
            <div className='grid lg:grid-cols-3 gap-5 my-10 mx-5 lg:mx-0'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        setFurniture={setFurniture}
                    ></Product>)
                }
            </div>
            <div>

                {
                    furniture &&
                    <BookingModals
                        furniture={furniture}
                        setFurniture={setFurniture}
                        refetch={refetch}
                    ></BookingModals>
                }
            </div>


        </div>

    );
};

export default Furnitures;  