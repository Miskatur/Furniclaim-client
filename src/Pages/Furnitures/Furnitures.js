import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
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
    const url = `https://furniclaim-server.vercel.app/products/${name}`

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["name"],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
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
                        refetch={refetch}
                    ></BookingModals>
                }
            </div>


        </div>

    );
};

export default Furnitures;  