import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const Furnitures = () => {
    const category = useLoaderData()
    const navigation = useNavigation()

    const { name } = category;

    if (navigation.state === 'loading') {
        return <Loader></Loader>
    }

    return (
        <div className='lg:px-20 py-20'>
            <h1 className='text-2xl font-semibold text-secondary text-center'>You are showing the  <span className='font-bold'>{name}</span> category.</h1>
            <div>

            </div>


        </div>

    );
};

export default Furnitures;  