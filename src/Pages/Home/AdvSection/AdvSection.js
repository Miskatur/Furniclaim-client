import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loader from '../../../components/Loader/Loader';
import Product from '../../Furnitures/Product/Product';

const AdvSection = () => {
    const { loading } = useContext(AuthContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`https://furniclaim-server.vercel.app/advproduct`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    if (loading) {
        <Loader></Loader>
    }

    return (
        <div>
            <h2 className='text-3xl font-bold text-secondary text-center'>Advertisement</h2>
            <div className='content my-12'>

                <div className='grid lg:grid-cols-3 gap-5 my-10 mx-5 lg:mx-0'>
                    {
                        products.map((product) => <Product
                            key={product._id}
                            product={product}
                        ></Product>)
                    }
                </div>
            </div>
        </div>

    );
};

export default AdvSection;