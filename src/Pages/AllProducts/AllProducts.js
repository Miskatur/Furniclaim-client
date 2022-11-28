import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import BookingModals from '../../components/BookingModals/BookingModals';
import Loader from '../../components/Loader/Loader';
import Product from '../Furnitures/Product/Product';

const AllProducts = () => {

    const { loading } = useContext(AuthContext)
    const [furniture, setFurniture] = useState(null)
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://furniclaim-server.vercel.app/products`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    })
    if (isLoading || loading) {
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
                    ></BookingModals>
                }
            </div>
        </div>
    );
};

export default AllProducts;