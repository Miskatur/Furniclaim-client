import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BookingModals from '../../../components/BookingModals/BookingModals';
import Loader from '../../../components/Loader/Loader';
import Product from '../../Furnitures/Product/Product';

const AdvSection = () => {
    const [furniture, setFurniture] = useState(null)

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://furniclaim-server.vercel.app/advproduct`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    })
    const handleReport = id => {
        fetch(`http://localhost:5000/reportproduct/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success('Reported to Admin Succesfully')
                    refetch()
                }
            })
    }

    if (isLoading) {
        <Loader></Loader>
    }

    return (
        <div>
            <h2 className='text-3xl font-bold text-secondary text-center'>Advertisement</h2>
            <div className='content my-12'>

                <div className='grid lg:grid-cols-3 gap-5 my-10 mx-5 lg:mx-0'>
                    {
                        products.map((product) =>
                            <Product
                                key={product._id}
                                product={product}
                                setFurniture={setFurniture}
                                handleReport={handleReport}
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
        </div>

    );
};

export default AdvSection;